
export class Client {

    static async requestJson(url: string, method: string, data: Object) {
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        return response.json()
    }
}
