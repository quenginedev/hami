import { FilterQuery } from "mongoose";
import { handleRequest } from "../utils/handle-request";
import { ModelDoc } from "..";
type Options<T> = {
	query?: FilterQuery<T>;
	limit?: number;
	sort?: any;
};

export type FindManyType<T> = Array<ModelDoc<T>>;

export const findMany = <
	S,
	M extends keyof S = keyof S
>(context: Context<M>) =>
	async <T = S[M]>(options: Options<S[M]> = {}) => {
		const { http, model } = context;
		const { query, limit, sort } = options;

		return handleRequest<FindManyType<T>>(
			http.get(`/${String(model)}`, {
				params: { query, sort, limit },
			})
		);
	};
