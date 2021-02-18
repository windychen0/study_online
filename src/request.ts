import Person from "*.ts";
import { ElLoading } from 'element-plus';

let publicUrl = "http://119.45.38.148:8081";

function request({
    url = "",
    method = "POST",
    data = {}
},isLoading = false) {

    let loading: any;

    if(isLoading){
        loading = ElLoading.service({
            fullscreen: true,
            lock: true,
            text: "加载中...",
            background: 'rgba(0, 0, 0, 0.6)'
        });
    }
    return fetch(`${publicUrl}${url}`, {
            method,
            body: JSON.stringify(data),
            headers: {
                'content-type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            return data
        })
        .catch(e => {

            if (e) {
                console.log(e);
            }

            throw e;
        })
        .finally(()=>{
            if(isLoading){
                loading.close()
            }
        })
}

interface Pages {
    pageNumber?: number;
    pageSize?: number;
    name?: "";
}

export default {
    admin_add_user(person: Person){
        return request({
            url: "/user/add",
            data: person,
        })
    },
    login(data = {}){
        return request({
            url: "/login",
            data,
        })
    },
    register(data = {}){
        return request({
            url: "/user/add",
            data,
        })
    },
    getSchool(data: Pages){
        return request({
            url: "/school/list",
            data: {
                pageNumber: data.pageNumber || 1,
                pageSize: data.pageSize || 20,
                name: data.name || ''
            },
        })
    }
}