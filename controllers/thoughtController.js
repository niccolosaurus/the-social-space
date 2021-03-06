const { User, Thought } = require('../models');

module.exports = {
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },

  getSingleThought(req, res) {
    Thought.findOne({_id: req.params.thoughtId})
      .select('-__v')
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'Nothing with that ID' })
          : res.json({thought})
      )
      .catch((err) => res.status(500).json(err));
  },

  createThought(req, res) {
    Thought.create(req.body)
      User.findOneAndUpdate(
        {_id: req.params.userID},
        {$addToSet: {thoughts: req.body}},
        {runValidators: true, new: true}
      )
        .then((thought) =>
          !thought
            ?res.status(404).json({message: 'No user with that ID'})
            :res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
  },


  deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res
              .status(404)
              .json({ message: 'Nothing with that ID' })
          : Thought.findOneAndUpdate(
              { thoughts: req.params.thoughtId },
              { $pull: { thoughts: req.params.thoughtId } },
              { runValidators: true, new: true }
            ),
      )
      .then((reaction) =>
        !reaction
          ? res.status(404).json({message: 'User deleted'})
          : res.json({ message: 'Thought deleted' }),
      )
      .catch((err) => res.status(500).json(err));
  },

  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true },
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: `Nothing with that ID` })
          : res.json(thought),
      )
      .catch((err) => res.status(500).json(err));
  },

  createReaction(req, res) {
    console.log('You are reacting to this thought');
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new:true}
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'Nothing with that ID' })
          : res.json(thought),
      )
      .catch((err) => res.status(500).json(err));
  },

  removeReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { thoughtId: req.params.thoughtId } } },
      { runValidators: true, new: true },
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'Nothing with that ID' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
};