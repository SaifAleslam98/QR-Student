$(window).on('load', async function () {
    try {

        const response = await sendGetRequest(`attendance/`, null);
        if (response) {
            const { data } = response;
            let tbody = '';
            let dataLenght = data.length
            if (dataLenght > 0) {
                for (let counter = 0; counter < dataLenght; counter++) {
                    tbody += `
                                <tr>
                                    <th scope="row">${counter+1}</th>
                                    <td>${data[counter].studentId.name}</td>
                                    <td>${data[counter].subjectId.name}</td>
                                    <td>${data[counter].subjectId.faculty}</td>
                                    <td>${data[counter].subjectId.level}</td>
                                    <td>${data[counter].subjectId.semester}</td>
                                    <td>${data[counter].attendanceAt}</td>
                                    <td>${data[counter].time}</td>
                                    <td>delete</td>
                                </tr>
                            `;
                }
                $('#attendance-tbody').append(tbody);
            } else {
                $('#no-msg').html('No attendance to view.')
            }

        }
    } catch (error) {
        handleError(error);
    }
});

