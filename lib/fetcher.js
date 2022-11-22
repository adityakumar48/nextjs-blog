import useSWR from 'swr'

const BaseUrl = "http://localhost:3000/";
const response = (...args) => fetch(...args).then(res => res.json())

export default function fetcher(    endpoint){
    const {data,error} = useSWR(`${BaseUrl}${endpoint}`,response)
    return {
        data,
        isLoading: !error && !data,
        isError: error
    }
}