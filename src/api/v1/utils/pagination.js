const paginate = async (model, page = 1, pageSize = 10) => {
    try {
        const totalItems = await model.countDocuments();
        const totalPages = Math.ceil(totalItems / pageSize);

        const items = await model.find()
            .skip((page - 1) * pageSize)
            .limit(pageSize);

        const paginationInfo = {
            total: totalItems,
            pages: totalPages,
            page: page,
        };

        return { paginationInfo, items };
    } catch (error) {
        throw error;
    }
};

export default paginate;
