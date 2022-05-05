import {InMemoryCache, createHttpLink, ApolloClient} from "@apollo/client";
import { createApolloProvider } from "@vue/apollo-option";

// const authLink = setContext(async (_, { headers }) => {
// 	// get the authentication token from local storage if it exists
// 	const token = getSID()
// 	// Return the headers to the context so httpLink can read them
// 	return {
// 		headers: {
// 			...headers,
// 			'X-Token': token || ''
// 		}
// 	}
// })

const httpLink = createHttpLink({
	// You should use an absolute URL here
	uri: process.env.VUE_APP_GQL_URL,
})

const cache = new InMemoryCache();

const defaultOptions = {
	watchQuery: {
		fetchPolicy: 'no-cache',
		errorPolicy: 'ignore'
	},
	query: {
		fetchPolicy: 'no-cache',
		errorPolicy: 'all'
	}
}

const apolloClient = new ApolloClient({
	link: httpLink,
	cache,
	defaultOptions: defaultOptions
})

const provider = new createApolloProvider({
	defaultClient: apolloClient,
})

export default provider
