const validate = async (title, authorId) => {
  if (!title) return { code: 422, message: 'Title required' };
  if (typeof title !== 'string') return { code: 422, message: 'Title must be string' };
  if (!authorId) return { code:422, message: 'Author id required' };
  
  const author = await Author.findById(authorId);
  if (!author) return { code: 404, message: 'Author Notfound' };

  return {};
};

module.exports = {
  validate,
};
