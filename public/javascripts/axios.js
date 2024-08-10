const base_url = 'https://qr-api-lcgr.onrender.com'
//http://localhost:3000'


//axios.defaults.timeout = 5000;
function newAbortSignal(timeoutMs) {
    const abortController = new AbortController();
    setTimeout(() => abortController.abort(), timeoutMs || 30000);
    return abortController.signal;
}
// Header with Token
/*const authorizedHeader = {
    'Authorization': `Bearer ${JSON.parse(getCookie('u_token'))}`
}
*/

function hideLoader() { }
function alertMsg(msg, type) {
    $(window).scrollTop(0)
    $('#alertBox').html(`
                <div class="alert alert-${type} alert-dismissible rounded-0" role="alert">
                    ${msg}
                </div>
          
    `);
    

    setTimeout(() => {
        $('#alertBox').html('');
    }, 9000)
}


//Handle Error Function
function handleError(error) {
    console.log(error)
    switch (error.code) {
        case 'ECONNABORTED':
            alertMsg('Request timeout', 'danger')
            break;
        case 'ERR_CANCELED':
            alertMsg('Request canceled, took long time', 'danger')
            break;
        case 'ERR_BAD_REQUEST':
            alertMsg(error.response.data.message, 'danger')
            break;
        case 'ERR_BAD_RESPONSE':
            alertMsg(error.response.data.message, 'danger')
            break;
        default:
            alertMsg(error.message, 'danger')
            break;
    }
}
async function sendGetRequest(url, body, header) {
    try {
        //showLoader()
        const response = await axios.get(`${base_url}/${url}`, {
            headers: header,
            signal: newAbortSignal()
        });
        hideLoader()
        const myData = response.data;
        if (response.status == 200 || 201) {
            return myData;
        }
        alertMsg(response.data.message, 'danger')
    } catch (error) {
        //hideLoader()
        handleError(error)
    }
}
async function sendDeleteRequest(url, body, header) {
    try {
        const response = await axios.delete(`${base_url}/${url}`, {
            data: body,
            headers: header,
            signal: newAbortSignal()
        });
        const myData = response.data;
        if (response.status == 200) {
            return myData;
        }
        alertMsg(response.data.message, 'primary')
    } catch (error) {
        handleError(error)
    }
}
async function sendPostRequest(url, body, header) {
    try {
        const response = await axios.post(`${base_url}/${url}`, body, {
            headers: header,
            signal: newAbortSignal(15000)
        });
        const myData = response.data;
        if (response.status == 201 || 200) {
            return myData;
        }
        alertMsg(response.data.message, 'primary')
    } catch (error) {
        handleError(error)
    }
}

async function sendPutRequest(url, body, header) {
    try {
        showLoader()
        const response = await axios.put(`${base_url}/${url}`, body, {
            headers: header,
            signal: newAbortSignal(15000)
        });
        stopLoadingButton()
        hideLoader()
        const myData = response.data;
        if (response.status == 201 || 200) {
            return myData;
        }
        alertMsg(response.data.message, 'primary')
    } catch (error) {
        stopLoadingButton()
        hideLoader()
        handleError(error)
    }
}