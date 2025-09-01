 
// routes/tasks.js
const express = require('express');
const { authenticateToken, authorize } = require('../middleware/auth');
const Task = require('../models/Task');
const User = require('../models/User');

const router = express.Router();

// GET /tasks - Read all tasks with role-based filtering
router.get('/', authenticateToken, async (req, res) => {
  try {
    const { status, priority, page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    let query = { isDeleted: false };

    // Role-based filtering
    if (req.user.role === 'user') {
      // Users can only see tasks they created or are assigned to
      query.$or = [
        { createdBy: req.user._id },
        { assignedTo: req.user._id }
      ];
    }
    // Admins can see all tasks

    // Additional filters
    if (status) query.status = status;
    if (priority) query.priority = priority;

    const tasks = await Task.find(query)
      .populate('createdBy', 'name email')
      .populate('assignedTo', 'name email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Task.countDocuments(query);

    res.json({
      success: true,
      tasks,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    console.error('Get tasks error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// POST /tasks - Create a new task
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { title, description, status, priority, dueDate, assignedTo } = req.body;

    // Validation
    if (!title || title.trim().length === 0) {
      return res.status(400).json({ success: false, message: 'Title is required' });
    }

    // Validate assignedTo if provided
    if (assignedTo) {
      const assignedUser = await User.findById(assignedTo);
      if (!assignedUser) {
        return res.status(400).json({ success: false, message: 'Assigned user not found' });
      }
    }

    const task = new Task({
      title: title.trim(),
      description: description?.trim(),
      status: status || 'pending',
      priority: priority || 'medium',
      dueDate: dueDate ? new Date(dueDate) : undefined,
      createdBy: req.user._id,
      assignedTo: assignedTo || req.user._id
    });

    await task.save();
    await task.populate('createdBy', 'name email');
    await task.populate('assignedTo', 'name email');

    res.status(201).json({
      success: true,
      message: 'Task created successfully',
      task
    });
  } catch (error) {
    console.error('Create task error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// PUT /tasks/:id - Update a specific task
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status, priority, dueDate, assignedTo } = req.body;

    let task = await Task.findOne({ _id: id, isDeleted: false });

    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    // Permission check
    const canUpdate = req.user.role === 'admin' || 
                     task.createdBy.toString() === req.user._id.toString() ||
                     task.assignedTo.toString() === req.user._id.toString();

    if (!canUpdate) {
      return res.status(403).json({ success: false, message: 'Not authorized to update this task' });
    }

    // Validation
    if (title !== undefined) {
      if (!title || title.trim().length === 0) {
        return res.status(400).json({ success: false, message: 'Title cannot be empty' });
      }
      task.title = title.trim();
    }

    if (description !== undefined) task.description = description?.trim();
    if (status !== undefined) task.status = status;
    if (priority !== undefined) task.priority = priority;
    if (dueDate !== undefined) task.dueDate = dueDate ? new Date(dueDate) : undefined;

    // Only admins and task creators can reassign tasks
    if (assignedTo !== undefined && (req.user.role === 'admin' || task.createdBy.toString() === req.user._id.toString())) {
      if (assignedTo) {
        const assignedUser = await User.findById(assignedTo);
        if (!assignedUser) {
          return res.status(400).json({ success: false, message: 'Assigned user not found' });
        }
        task.assignedTo = assignedTo;
      }
    }

    await task.save();
    await task.populate('createdBy', 'name email');
    await task.populate('assignedTo', 'name email');

    res.json({
      success: true,
      message: 'Task updated successfully',
      task
    });
  } catch (error) {
    console.error('Update task error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// DELETE /tasks/:id - Delete a specific task
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findOne({ _id: id, isDeleted: false });

    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    // Permission check - only admins and task creators can delete
    const canDelete = req.user.role === 'admin' || 
                     task.createdBy.toString() === req.user._id.toString();

    if (!canDelete) {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this task' });
    }

    // Soft delete
    task.isDeleted = true;
    await task.save();

    res.json({
      success: true,
      message: 'Task deleted successfully'
    });
  } catch (error) {
    console.error('Delete task error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;