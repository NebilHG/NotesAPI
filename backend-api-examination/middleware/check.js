function validateNoteParams(req, res, next) {
    const { title, text } = req.body;
    if (!title || !text) {
        return res.status(400).json({ error: 'Missing required parameters' });
    }
    next();
}


module.exports = {validateNoteParams}