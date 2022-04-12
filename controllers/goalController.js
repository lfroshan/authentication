const asyncHandler = require('express-async-handler');
const Goal = require('../models/goalModel');

// @desc Get Goals
// @route GET /api/goals
// @access Private
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find();
  res.status(200).json(goals);
});

// @desc Set Goals
// @route POST /api/goals
// @access Private
const setGoals = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400).json({ error: 'Please add a body in the request' });
  }
  const goal = await Goal.create({
    text: req.body.text,
  });

  res.status(200).json(goal);
});

// @desc Update Goals
// @route PUT /api/goals/:id
// @access Private
const updateGoals = asyncHandler(async (req, res) => {
  const goal = Goal.findById({ _id: req.params.id });
  if (!goal) {
    res.status(400);
    throw new Error('Goal not found');
  }
  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json({ message: `updated goal ${updatedGoal}` });
});

// @desc Delete Goals
// @route Delete /api/goals:id
// @access Private
const deleteGoals = asyncHandler(async (req, res) => {
  const goal = await Goal.findById({ _id: req.params.id });
  if (!goal) {
    res.status(404);
    throw new Error('No goal found');
  }
  await goal.remove();
  res.status(200).json({ message: `Deleted goal for id: ${req.params.id}` });
});

module.exports = { getGoals, setGoals, updateGoals, deleteGoals };
