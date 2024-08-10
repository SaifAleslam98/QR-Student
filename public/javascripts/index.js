const urlParams = new URLSearchParams(window.location.search);
    const keyParam = urlParams.get('key');
    //Function to Set Cookie
    function setCookie(cname, cvalue, exdays) {
        const d = new Date();
        d.setTime(d.getTime() + (exdays * 60 * 60 * 1000));
        let expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/" + ';secure=' + true;
    }
    //Function to Get Cookie Value
    function getCookie(cname) {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }
    $(window).on('load', async function () {
        let studentCode = await getCookie('stdCode');
        let subjectKey = await getCookie('sKey');
        if(!studentCode || !subjectKey){
            $('#studentConfig').html(studentRegister)
        }else{
            const studentResponse = await sendGetRequest(`student/check?code=${studentCode}&key=${subjectKey}`, null);
            
            if(studentResponse.success == false){
                $('#studentConfig').html(failAttend)
            }else{
                $('#studentConfig').html(successAttend)
            }
            
        }
    })

    let studentRegister = `
    <div class="row justify-content-center ">
        <div class="col-6 ">
            <div class="mb-3">
                <label for="faculty" class="form-label mb-0">Student code</label>
                <input type="text" class="form-control rounded-0" id="stdCode" placeholder="Enter your code...">
            </div>
            <div class="d-grid gap-2">
                <button class="btn btn-outline-info rounded-0" type="button" id="studentCheck">Check</button>
            </div>

        </div>
    </div>
    `;
    let successAttend = `
    <div class="row justify-content-center mb5">
        <div class="col-sm-6 text-center">
            <img class="" src="/images/969603.png" width="50%"/>
        </div>
    </div>
    <div class="row justify-content-center">
        <div class="col-sm-6 text-center">
            <p class="fw-bold fs-4">Your Attendance Saved Succefully</p>
        </div>
    </div>
    `;
    let failAttend = `
    <div class="row justify-content-center mb5">
        <div class="col-sm-6 text-center">
            <img class="" src="/images/attention.png" width="50%"/>
        </div>
    </div>
    <div class="row justify-content-center">
        <div class="col-sm-6 text-center">
            <p class="fw-bold fs-4">You can not attendance twice!</p>
        </div>
    </div>
    `;


    $(document).on('click', '#studentCheck', async function () {
        try {
            let code = document.getElementById('stdCode').value;
            const studentResponse = await sendGetRequest(`student/check?code=${code}&key=${keyParam}`, null);

            await setCookie('stdCode', code, 7);
            await setCookie('sKey', keyParam, 7);
            $('#studentConfig').html(successAttend)
        } catch (error) {
            handleError(error);
        }
    })