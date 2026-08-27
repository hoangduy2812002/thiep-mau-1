const listElement = document.getElementById("list");

const reloadButton = document.getElementById("reloadButton");


// ========================================
// TẢI DANH SÁCH
// ========================================

async function loadMessages() {

    try {

        listElement.innerHTML =
            "Đang tải...";


        const response =
            await fetch(
                "/api/data"
            );


        const result =
            await response.json();


        if (!response.ok) {

            throw new Error(
                result.message ||
                "Không thể tải dữ liệu"
            );

        }


        const data =
            result.data || [];


        // ------------------------------
        // Không có dữ liệu
        // ------------------------------

        if (
            data.length === 0
        ) {

            listElement.innerHTML = `
                <div class="empty">
                    Chưa có lời chúc nào.
                </div>
            `;

            return;

        }


        listElement.innerHTML =
            "";


        // ------------------------------
        // Hiển thị từng lời chúc
        // ------------------------------

        data.forEach(
            item => {

                const element =
                    document.createElement(
                        "div"
                    );


                element.className =
                    "item";


                // =========================
                // NAME
                // =========================

                const name =
                    document.createElement(
                        "div"
                    );


                name.className =
                    "name";


                name.textContent =
                    item.name;


                // =========================
                // MESSAGE
                // =========================

                const message =
                    document.createElement(
                        "div"
                    );


                message.className =
                    "message";


                message.textContent =
                    item.message;


                // =========================
                // DATE
                // =========================

                const date =
                    document.createElement(
                        "div"
                    );


                date.className =
                    "date";


                if (
                    item.createdAt
                ) {

                    date.textContent =
                        new Date(
                            item.createdAt
                        ).toLocaleString(
                            "vi-VN"
                        );

                }


                // =========================
                // DELETE
                // =========================

                const deleteButton =
                    document.createElement(
                        "button"
                    );


                deleteButton.className =
                    "delete-button";


                deleteButton.textContent =
                    "Xóa";


                deleteButton.addEventListener(
                    "click",
                    () => {

                        deleteMessage(
                            item.id
                        );

                    }
                );


                // =========================
                // APPEND
                // =========================

                element.appendChild(
                    name
                );


                element.appendChild(
                    message
                );


                element.appendChild(
                    date
                );


                element.appendChild(
                    deleteButton
                );


                listElement.appendChild(
                    element
                );

            }
        );


    } catch (error) {

        console.error(
            "LOAD ERROR:",
            error
        );


        listElement.innerHTML =
            "";


        const errorElement =
            document.createElement(
                "div"
            );


        errorElement.className =
            "empty";


        errorElement.textContent =
            "Lỗi: " +
            error.message;


        listElement.appendChild(
            errorElement
        );

    }

}

// ========================================
// XÓA
// ========================================

async function deleteMessage(
    id
) {

    const confirmed =
        confirm(
            "Bạn có chắc muốn xóa lời chúc này?"
        );


    if (!confirmed) {

        return;

    }


    try {

        const response =
            await fetch(
                "/api/data",
                {

                    method:
                        "DELETE",

                    headers: {

                        "Content-Type":
                            "application/json"

                    },

                    body:
                        JSON.stringify({

                            id:
                                id

                        })

                }
            );


        const result =
            await response.json();


        if (!response.ok) {

            throw new Error(
                result.message ||
                "Không thể xóa"
            );

        }


        alert(
            "Xóa thành công!"
        );


        // Tải lại

        await loadMessages();


    } catch (error) {

        console.error(
            "DELETE ERROR:",
            error
        );


        alert(
            "Lỗi: " +
            error.message
        );

    }

}

reloadButton.addEventListener(
    "click",
    loadMessages
);

loadMessages();