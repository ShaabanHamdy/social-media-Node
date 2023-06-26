import joi from "joi";

export const addPostSchema = {
  body: joi.object().required().keys({
    title: joi.string().required(),
    desc: joi.string().required(),
  }),
};

export const deleteSchema = {
  params: joi.object()
    .required()
    .keys({
      postId: joi.string().required().min(24).max(24),
    }),
};

export const updateSchema = {
  body: joi.object().required().keys({
    title: joi.string().required(),
    desc: joi.string().required(),
  }),
  params: joi.object()
    .required()
    .keys({
      postId: joi.string().required().min(24).max(24),
    }),
};

export const likeSchema = {
  params: joi.object()
    .required()
    .keys({
      postId: joi.string().required().min(24).max(24),
    }),
};

export const unlikeSchema = {
  params: joi.object()
    .required()
    .keys({
      postId: joi.string().required().min(24).max(24),
    }),
};
