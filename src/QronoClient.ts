class QronoClient extends Object {
    API_URL = "https://qrono.dev"

    async get(path: string) {
        const url = `${this.API_URL}/${path}`
        const response = await fetch(url)
        const parsedResponse = await response.json()
        return parsedResponse
    }

    async post(path: string, data: Record<string, any>) {
        const url = `${this.API_URL}/${path}`
        const response = await fetch(url, {
            body: JSON.stringify(data),
            // no-cors, *cors, same-origin
            cache: 'no-cache',
            // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin',
            // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json',
            },
            method: 'POST',
            mode: 'cors',
            // include, *same-origin, omit
            redirect: 'follow',
            // manual, *follow, error
            referrerPolicy: 'no-referrer'
        });
        try {
            const parsedResponse = await response.json()
            return parsedResponse
        } catch (error) {
            return error
        }
    }
}

export default new QronoClient();