//when page is loaded, show() function is meediately called
$(document).ready(function () {
    show();
});

//receives jsonified data into response
//dissects each data entry so that with for loop iteration
//stores each data entry into temp_html to append to our post-box

function show() {
    $.ajax({
        type: 'GET',
        url: '/profile',
        data: {},
        success: function (response) {
            let rows = response['intro'];
            for (let i = 0; i < rows.length; i++) {
                let name = rows[i]['name'];
                let hi = rows[i]['hi'];

                let temp_html = ` <tr>
                                <td>${name}</td>
                                <td>${hi}</td> 
                            </tr>`;
                $('#box').append(temp_html);
            }
        },
    });
}

// gets called when post button gets clicked
// saves input entries and calls jQuery ajax
// sends data to app.py
// if connection is successful, pop-up alert will say connection established
function save() {
    let name = $('#name').val();
    let hi = $('#hi').val();

    $.ajax({
        type: 'POST',
        url: '/profile',
        data: { name_give: name, hi_give: hi }, //sends data to app.py
        success: function (response) {
            alert(response['msg']); //pop-up message that
            window.location.reload(); //다 가져오면 새로고침
        },
    });
}
