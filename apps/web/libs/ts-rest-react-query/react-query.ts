import * as tanstackReactQuery from "@tanstack/react-query";
import {
	FetchQueryOptions,
	QueryClient,
	QueryFilters,
	QueryFunction,
	QueryFunctionContext,
	QueryKey,
	UseInfiniteQueryOptions as TanStackUseInfiniteQueryOptions,
	UseMutationOptions as TanStackUseMutationOptions,
	UseQueryOptions as TanStackUseQueryOptions,
	useInfiniteQuery,
	useMutation,
	useQueries,
	useQuery,
	useQueryClient,
	useSuspenseQuery,
} from "@tanstack/react-query";
import {
	AppRoute,
	AppRouteMutation,
	AppRouter,
	ClientArgs,
	ClientInferRequest,
	Without,
	ZodInferOrType,
	evaluateFetchApiArgs,
	fetchApi,
	isAppRoute,
} from "@ts-rest/core";
import { useMemo } from "react";
import {
	AppRouteFunctions,
	AppRouteFunctionsWithQueryClient,
	DataReturnQueries,
	RequestArgs,
} from "./inner-types";

const queryFn = <TAppRoute extends AppRoute, TClientArgs extends ClientArgs>(
	route: TAppRoute,
	clientArgs: TClientArgs,
	args?: ClientInferRequest<AppRouteMutation, ClientArgs>,
): QueryFunction<TAppRoute["responses"]> => {
	return async (queryFnContext?: QueryFunctionContext) => {
		const fetchApiArgs = evaluateFetchApiArgs(route, clientArgs, args);
		const result = await fetchApi({
			...fetchApiArgs,
			fetchOptions: {
				...(queryFnContext?.signal && { signal: queryFnContext.signal }),
				...fetchApiArgs.fetchOptions,
			},
		});

		// If the response is not a 2XX, throw an error to be handled by react-query
		if (!String(result.status).startsWith("2")) {
			throw result;
		}

		// bad bad code, but works
		return result.body as TAppRoute["responses"];
	};
};

const getRouteQueryKey = <TAppRoute extends AppRoute>(route: TAppRoute) => {
	return (args?: ClientInferRequest<AppRouteMutation, ClientArgs>) => {
		const baseQueryKey = route.path
			.split("/")
			.filter((part) => part !== "")
			.join(".");
		return (args ? [baseQueryKey, args] : [baseQueryKey]) as QueryKey;
	};
};

const getRouteUseQuery = <
	TAppRoute extends AppRoute,
	TClientArgs extends ClientArgs,
>(
	route: TAppRoute,
	clientArgs: TClientArgs,
) => {
	return (_?: {
		args?: ClientInferRequest<AppRouteMutation, ClientArgs>;
		options?: TanStackUseQueryOptions<TAppRoute["responses"]>;
	}) => {
		const { args, options } = _ || {
			args: undefined,
			options: undefined,
		};
		const dataFn = queryFn(route, clientArgs, args);
		const queryKey = getRouteQueryKey(route)(args);

		return useQuery({ queryKey, queryFn: dataFn, ...options });
	};
};

const getRouteUseQueries = <
	TAppRoute extends AppRoute,
	TClientArgs extends ClientArgs,
>(
	route: TAppRoute,
	clientArgs: TClientArgs,
) => {
	return (args: Parameters<DataReturnQueries<TAppRoute, TClientArgs>>[0]) => {
		const queries = args.queries.map((fullQueryArgs: any) => {
			const { credentials, queryKey, retry, ...queryArgs } = fullQueryArgs;
			const dataFn = queryFn(route, clientArgs, queryArgs);

			return {
				queryFn: dataFn,
				...fullQueryArgs,
			};
		});

		return useQueries({ queries });
	};
};

const getRouteUseInfiniteQuery = <
	TAppRoute extends AppRoute,
	TClientArgs extends ClientArgs,
>(
	route: TAppRoute,
	clientArgs: TClientArgs,
) => {
	return (
		queryKey: QueryKey,
		argsMapper: (
			context: QueryFunctionContext,
		) => ClientInferRequest<AppRouteMutation, ClientArgs>,
		options?: TanStackUseInfiniteQueryOptions<TAppRoute["responses"]>,
	) => {
		const dataFn: QueryFunction<TAppRoute["responses"]> = async (context) => {
			const resultingQueryArgs = argsMapper(context);

			const innerDataFn = queryFn(route, clientArgs, resultingQueryArgs);

			return innerDataFn(undefined as any);
		};

		// @ts-ignore
		return useInfiniteQuery({ queryKey, queryFn: dataFn, ...options });
	};
};

const getRouteUseSuspenseQuery = <
	TAppRoute extends AppRoute,
	TClientArgs extends ClientArgs,
>(
	route: TAppRoute,
	clientArgs: TClientArgs,
) => {
	return (_?: {
		queryKey?: QueryKey;
		args?: ClientInferRequest<AppRouteMutation, ClientArgs>;
		options?: TanStackUseQueryOptions<TAppRoute["responses"]>;
	}) => {
		const { queryKey, args, options } = _ || {
			queryKey: undefined,
			args: undefined,
			options: undefined,
		};
		const dataFn = queryFn(route, clientArgs, args);
		const targetQueryKey = queryKey || getRouteQueryKey(route)(args);

		return useSuspenseQuery({
			queryKey: targetQueryKey,
			queryFn: dataFn,
			...options,
		});
	};
};

const getRouteUseSuspenseQueries = <
	TAppRoute extends AppRoute,
	TClientArgs extends ClientArgs,
>(
	route: TAppRoute,
	clientArgs: TClientArgs,
) => {
	return (args: Parameters<DataReturnQueries<TAppRoute, TClientArgs>>[0]) => {
		const queries = args.queries.map((fullQueryArgs: any) => {
			const { credentials, queryKey, retry, ...queryArgs } = fullQueryArgs;
			const dataFn = queryFn(route, clientArgs, queryArgs);

			return {
				queryFn: dataFn,
				...fullQueryArgs,
			};
		});

		const useSuspenseQueries =
			tanstackReactQuery.useSuspenseQueries as typeof tanstackReactQuery.useQueries;
		return useSuspenseQueries({ queries });
	};
};

const getRouteUseSuspenseInfiniteQuery = <
	TAppRoute extends AppRoute,
	TClientArgs extends ClientArgs,
>(
	route: TAppRoute,
	clientArgs: TClientArgs,
) => {
	return (
		queryKey: QueryKey,
		argsMapper: (
			context: QueryFunctionContext,
		) => ClientInferRequest<AppRouteMutation, ClientArgs>,
		options?: TanStackUseInfiniteQueryOptions<TAppRoute["responses"]>,
	) => {
		const dataFn: QueryFunction<TAppRoute["responses"]> = async (context) => {
			const resultingQueryArgs = argsMapper(context);

			const innerDataFn = queryFn(route, clientArgs, resultingQueryArgs);

			return innerDataFn(undefined as any);
		};
		const useSuspenseInfiniteQuery =
			tanstackReactQuery.useSuspenseInfiniteQuery as typeof tanstackReactQuery.useInfiniteQuery;
		return useSuspenseInfiniteQuery({
			queryKey,
			// @ts-ignore
			queryFn: dataFn,
			...options,
		});
	};
};

const getRouteUseMutation = <
	TAppRoute extends AppRoute,
	TClientArgs extends ClientArgs,
>(
	route: TAppRoute,
	clientArgs: TClientArgs,
) => {
	return (options?: TanStackUseMutationOptions<TAppRoute["responses"]>) => {
		const mutationFunction = async (
			args?: ClientInferRequest<AppRouteMutation, ClientArgs>,
		) => {
			const dataFn = queryFn(route, clientArgs, args);

			return dataFn(undefined as any);
		};

		return useMutation({
			mutationFn: mutationFunction as () => Promise<
				ZodInferOrType<TAppRoute["responses"]>
			>,
			...options,
		});
	};
};

export type InitClientReturn<
	T extends AppRouter,
	TClientArgs extends ClientArgs,
> = {
	[TKey in keyof T]: T[TKey] extends AppRoute
		? Without<AppRouteFunctions<T[TKey], TClientArgs>, never>
		: T[TKey] extends AppRouter
			? InitClientReturn<T[TKey], TClientArgs>
			: never;
};

const ClientParameters = Symbol("ClientParameters");

export const initQueryClient = <
	T extends AppRouter,
	TClientArgs extends ClientArgs,
>(
	router: T,
	clientArgs: TClientArgs,
): InitClientReturn<T, TClientArgs> => {
	const recursiveInit = <TInner extends AppRouter>(
		innerRouter: TInner,
	): InitClientReturn<TInner, TClientArgs> => {
		return Object.fromEntries(
			Object.entries(innerRouter).map(([key, subRouter]) => {
				if (isAppRoute(subRouter)) {
					const getQueryKey = getRouteQueryKey(subRouter);
					return [
						key,
						{
							getQueryKey,
							useQuery: getRouteUseQuery(subRouter, clientArgs),
							useQueries: getRouteUseQueries(subRouter, clientArgs),
							useInfiniteQuery: getRouteUseInfiniteQuery(subRouter, clientArgs),
							useSuspenseQuery: getRouteUseSuspenseQuery(subRouter, clientArgs),
							useSuspenseQueries: getRouteUseSuspenseQueries(
								subRouter,
								clientArgs,
							),
							useSuspenseInfiniteQuery: getRouteUseSuspenseInfiniteQuery(
								subRouter,
								clientArgs,
							),
							useMutation: getRouteUseMutation(subRouter, clientArgs),
							fetchQuery: (
								queryClient: QueryClient,
								queryKey: QueryKey,
								args: ClientInferRequest<AppRouteMutation, ClientArgs>,
								options?: FetchQueryOptions<any>,
							) => {
								const dataFn = queryFn(subRouter, clientArgs, args);
								return queryClient.fetchQuery({
									queryKey,
									queryFn: dataFn,
									...options,
								});
							},
							fetchInfiniteQuery: (
								queryClient: QueryClient,
								queryKey: QueryKey,
								argsMapper: (
									context: QueryFunctionContext,
								) => ClientInferRequest<AppRouteMutation, ClientArgs>,
								options?: FetchQueryOptions<any>,
							) => {
								return queryClient.fetchInfiniteQuery({
									queryKey,
									// @ts-expect-error
									queryFn: async (context) => {
										const resultingQueryArgs = argsMapper(context);

										const innerDataFn = queryFn(
											subRouter,
											clientArgs,
											resultingQueryArgs,
										);

										return innerDataFn(undefined as any);
									},
									...options,
								});
							},
							prefetchQuery: (
								queryClient: QueryClient,
								queryKey: QueryKey,
								args: ClientInferRequest<AppRouteMutation, ClientArgs>,
								options?: FetchQueryOptions<any>,
							) => {
								const dataFn = queryFn(subRouter, clientArgs, args);

								return queryClient.prefetchQuery({
									queryKey,
									queryFn: dataFn,
									...options,
								});
							},
							prefetchInfiniteQuery: (
								queryClient: QueryClient,
								queryKey: QueryKey,
								argsMapper: (
									context: QueryFunctionContext,
								) => ClientInferRequest<AppRouteMutation, ClientArgs>,
								options?: FetchQueryOptions<any>,
							) => {
								return queryClient.prefetchInfiniteQuery({
									queryKey,
									// @ts-expect-error
									queryFn: async (context) => {
										const resultingQueryArgs = argsMapper(context);

										const innerDataFn = queryFn(
											subRouter,
											clientArgs,
											resultingQueryArgs,
										);

										return innerDataFn(undefined as any);
									},
									...options,
								});
							},
							getQueryData: (queryClient: QueryClient, queryKey: QueryKey) => {
								return queryClient.getQueryData(queryKey);
							},
							ensureQueryData: (
								queryClient: QueryClient,
								queryKey: QueryKey,
								args: ClientInferRequest<AppRouteMutation, ClientArgs>,
								options?: FetchQueryOptions<any>,
							) => {
								const dataFn = queryFn(subRouter, clientArgs, args);

								return queryClient.ensureQueryData({
									queryKey,
									queryFn: dataFn,
									...options,
								});
							},
							getQueriesData: (
								queryClient: QueryClient,
								filters: QueryFilters,
							) => {
								return queryClient.getQueriesData(filters);
							},
							setQueryData: (
								queryClient: QueryClient,
								args:
									| ClientInferRequest<AppRouteMutation, ClientArgs>
									| undefined,
								updater: any,
							) => {
								return queryClient.setQueryData(getQueryKey(args), updater);
							},
						},
					];
				}
				return [key, recursiveInit(subRouter)];
			}),
		);
	};

	return {
		...recursiveInit(router),
		[ClientParameters]: {
			router,
			clientArgs,
		},
	};
};

type InitUseTsRestQueryClientReturn<
	T extends AppRouter,
	TClientArgs extends ClientArgs,
> = {
	[TKey in keyof T]: T[TKey] extends AppRoute
		? Without<AppRouteFunctionsWithQueryClient<T[TKey], TClientArgs>, never>
		: T[TKey] extends AppRouter
			? InitUseTsRestQueryClientReturn<T[TKey], TClientArgs>
			: never;
};

export const useTsRestQueryClient = <
	T extends AppRouter,
	TClientArgs extends ClientArgs,
>(
	client: InitClientReturn<T, TClientArgs>,
): InitUseTsRestQueryClientReturn<T, TClientArgs> => {
	// @ts-expect-error - hidden symbol, so we can refetch the original client router and clientArgs
	const { router } = client[ClientParameters] as unknown as {
		router: T;
		clientArgs: TClientArgs;
	};

	const queryClient = useQueryClient();

	const recursiveInit = <TInner extends AppRouter>(
		innerRouter: TInner,
		innerClient: InitClientReturn<TInner, TClientArgs>,
	): InitUseTsRestQueryClientReturn<TInner, TClientArgs> => {
		return Object.fromEntries(
			Object.entries(innerRouter).map(([key, subRouter]) => {
				if (isAppRoute(subRouter)) {
					type TSubRouter = typeof subRouter;
					const routeFunctions = innerClient[key] as AppRouteFunctions<
						TSubRouter,
						TClientArgs
					>;

					return [
						key,
						{
							fetchQuery: (
								queryKey: QueryKey,
								args: ClientInferRequest<AppRouteMutation, ClientArgs>,
								options?: FetchQueryOptions<any>,
							) =>
								routeFunctions.fetchQuery(
									queryClient,
									queryKey,
									args as any,
									options,
								),
							fetchInfiniteQuery: (
								queryKey: QueryKey,
								argsMapper: (
									context: QueryFunctionContext,
								) => ClientInferRequest<AppRouteMutation, ClientArgs>,
								options?: FetchQueryOptions<any>,
							) =>
								routeFunctions.fetchInfiniteQuery(
									queryClient,
									queryKey,
									argsMapper as any,
									options,
								),
							prefetchQuery: (
								queryKey: QueryKey,
								args: ClientInferRequest<AppRouteMutation, ClientArgs>,
								options?: FetchQueryOptions<any>,
							) =>
								routeFunctions.prefetchQuery(
									queryClient,
									queryKey,
									args as any,
									options,
								),
							prefetchInfiniteQuery: (
								queryKey: QueryKey,
								argsMapper: (
									context: QueryFunctionContext,
								) => ClientInferRequest<AppRouteMutation, ClientArgs>,
								options?: FetchQueryOptions<any>,
							) =>
								routeFunctions.prefetchInfiniteQuery(
									queryClient,
									queryKey,
									argsMapper as any,
									options,
								),
							getQueryData: (queryKey: QueryKey, filters?: QueryFilters) =>
								routeFunctions.getQueryData(queryClient, queryKey, filters),
							ensureQueryData: (
								queryKey: QueryKey,
								args: ClientInferRequest<AppRouteMutation, ClientArgs>,
								options?: FetchQueryOptions<any>,
							) =>
								routeFunctions.ensureQueryData(
									queryClient,
									queryKey,
									args as any,
									options,
								),
							getQueriesData: (filters: QueryFilters) =>
								routeFunctions.getQueriesData(queryClient, filters),
							setQueryData: (args: RequestArgs, updater: any) =>
								routeFunctions.setQueryData(queryClient, args, updater),
						},
					];
				}
				return [key, recursiveInit(subRouter, innerClient[key] as any)];
			}),
		);
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	return useMemo(() => recursiveInit(router, client), [client]);
};
