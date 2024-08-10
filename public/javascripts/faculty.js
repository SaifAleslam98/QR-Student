$(window).on('load', async function () {
    try {
        const response = await sendGetRequest(`faculty/`, null);
        if (response) {
            const { data } = response;
            let tbody = '';
            let dataLenght = data.length
            if (dataLenght > 0) {
                for (let counter = 0; counter < dataLenght; counter++) {
                    tbody += `
                                <tr>
                                    <td>${counter+1}</td>
                                    <td>${data[counter].name}</td>
                                    <td></td>
                                </tr>
                            `;
                }
                $('#faculty-tbody').append(tbody);
            } else {
                $('#no-msg').html('No faculties exists, start add new one.')
            }

        }
    } catch (error) {
        handleError(error);
    }
});

$('#save-faculty').on('click', async function () {
    try {
        let name = $('#faculty').val();
        const response = await sendPostRequest(`faculty`, { name });
        if (response) {
            alertMsg(response.message, 'success');
            $('#faculty').val('');
        }
    } catch (error) {
        handleError(error);
    }
})