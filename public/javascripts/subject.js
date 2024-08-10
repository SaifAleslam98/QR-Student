$(window).on('load', async function () {
    try {
        const facultyResponse = await sendGetRequest(`faculty/`, null);
        if(facultyResponse){
            const  faculty  = facultyResponse.data;
            let faculties = '';
            let facultyLenght = faculty.length
            for (let index = 0; index < facultyLenght; index++) {
                faculties+=`
                        <option value="${faculty[index].name}">${faculty[index].name}</option>
                `;
            }
            $('#faculty').append(faculties)
        }
        const subjectResponse = await sendGetRequest(`subject/`, null);
        if (subjectResponse) {
            const { data } = subjectResponse;
            let tbody = '';
            let dataLenght = data.length
            if (dataLenght > 0) {
                for (let counter = 0; counter < dataLenght; counter++) {
                    tbody += `
                                <tr>
                                    <th scope="row">${counter+1}</th>
                                    <td>${data[counter].name}</td>
                                    <td>${data[counter].key}</td>
                                    <td>${data[counter].faculty}</td>
                                    <td>${data[counter].level}</td>
                                    <td>${data[counter].semester}</td>
                                    <td>delete</td>
                                </tr>
                            `;
                }
                $('#subject-tbody').append(tbody);
            } else {
                $('#no-msg').html('No subjects exists, start add new one.')
            }

        }
    } catch (error) {
        handleError(error);
    }
});

$('#save-subject').on('click', async function () {
    try {
        let myBody = {};
        myBody.name = $('#subject').val();
        myBody.faculty = $('#faculty').find(':selected').val();
        myBody.level = $('#level').find(':selected').val();
        myBody.semester = $('#semester').find(':selected').val();
        const response = await sendPostRequest(`subject`, myBody);
        if (response) {
            alertMsg(response.message, 'success');
            $('#subject').val('');
        }
    } catch (error) {
        handleError(error);
    }
})