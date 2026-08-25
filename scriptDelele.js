const APPS_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbwUj79NtXaCB3MTwkTVwpReHbldiWY0rw2QHP5NyPvLXJejltX7doxq3om_KnZgiL4A/exec";
// Khởi động khi load: tên khách mời + hiệu ứng trái tim
document.addEventListener("DOMContentLoaded", () => {
    console.log("start");
    getAll();
});

function btnDisabled(e) {
    const btn = document.getElementById("btn_delete");
    btn.disabled = e;
}

function getAll() {
    const path = decodeURIComponent(window.location.search);
    const timTen = decodeURIComponent(path).replace("?/", "");


    fetch(APPS_SCRIPT_URL)
        .then(r => r.json())
        .then(entries => {
            const path = decodeURIComponent(timTen).replace("?/", "");

            const [row, name, message] = path.split("/");

            const result = entries.find(
                (item, index) =>
                    Number(row) == Number(index) + 1 &&
                    String(item.name) === String(name) &&
                    String(item.message) === String(message)
            );
            console.log('--', result)
            if (result) {
                document.getElementById("name").innerHTML = `<p class="">${name}</p>`;
                document.getElementById("message").innerHTML = `<p class="">${message}</p>`;
                btnDisabled(false)
            } else {
                document.getElementById("name").innerHTML = `<p class="">Không có lời chúc</p>`;
                document.getElementById("message").innerHTML = `<p class="">...</p>`;
            }
        })
        .catch(error => {
            console.error(error);
        });

}
async function toggleXoaLoiChuc() {
    const timTen = decodeURIComponent(window.location.search);

    btnDisabled(true);

    document.getElementById("name").innerHTML = `<p class="">Đang xoá lời chúc</p>`;
    document.getElementById("message").innerHTML = `<p class="">...</p>`;

    fetch(APPS_SCRIPT_URL)
        .then(r => r.json())
        .then(entries => {

            const path = decodeURIComponent(timTen).replace("?/", "");

            const [row, name, message] = path.split("/");

            const result = entries.find(
                (item, index) =>
                    Number(row) == Number(index) + 1 &&
                    String(item.name) === String(name) &&
                    String(item.message) === String(message)
            );
            console.log('<<result', result);

            if (result) {
                deleteLoiChuc(Number(row));
            }
        })
        .catch(error => {
            console.error(error);
        });
    // const danhSachLoiChuc
}

async function deleteLoiChuc(row) {
    try {
        const response = await fetch(APPS_SCRIPT_URL, {
            method: "POST",
            body: JSON.stringify({
                action: "delete",
                row: row
            })
        });

        const result = await response.json();
        if (result.success) {
            document.getElementById("name").innerHTML = `<p class="">Xoá lời chúc thành công</p>`;

            let time = 7;
            const countdown = document.getElementById("message");

            countdown.innerText = time;

            const timer = setInterval(() => {
                time--;
                countdown.innerText = time;

                if (time <= 0) {
                    clearInterval(timer);
                    countdown.innerText = "Xong!";
                }
            }, 1000);

        } else {
            console.error(result.error);
        }
    } catch (error) {
        console.error(error);
    }
}
