import axios from "axios";


export const getData = (url) => {
    return new Promise((resolve, reject) => {
        try {
        axios.get(url).then(res => {
                resolve(res)
            }).catch(err => {
                reject(err);
            })
        } catch(err) {
            reject(err)
        }
    })
}

export const postDataWithToken = (url, data) => {
    return new Promise((resolve, reject) => {
        try {
            const token = localStorage.getItem('token')
            if(!token) throw ("No token");
            const config = {
                headers: {Authorization: `Bearer ${token}`}
            }
            axios.post(url, data).then(res => {
                resolve(res)
            }).catch(err => {
                reject(err);
            })
        } catch (err) {
            reject(err)
        }
    })
}

export const postDataWithoutToken = (url, data) => {
    return new Promise((resolve, reject) => {
        try {
            axios.post(url, data).then(res => {
                resolve(res)
            }).catch(err => {
                reject(err);
            })
        } catch (err) {
            reject(err)
        }
    })
}