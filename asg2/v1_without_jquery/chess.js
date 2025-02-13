function newGame() {
    window.location.reload();
    render_chessboard();
}

function makeMove() {
    let src = document.getElementById("src").value.trim().toLowerCase();
    let dst = document.getElementById("dst").value.trim().toLowerCase();

    let srcCell = document.getElementById(src);
    let dstCell = document.getElementById(dst);

    if (!srcCell || !dstCell || src === dst) {
        alert("Invalid move! Enter valid chess coordinates (e.g., F2 to F4).");
        return false;
    }

    dstCell.innerHTML = srcCell.innerHTML;
    srcCell.innerHTML = "&nbsp;";

    document.getElementById("id_location").value = "";
    document.getElementById("id_number").value = "";

    return false;
}

function render_chessboard() {
    fetch("chessboard.json")
        .then(response => response.json())
        .then(data => {
            let chessboard = data.chessboard;
            let boardHTML = "<table>";

            let rowNames = ["8", "7", "6", "5", "4", "3", "2", "1"];
            let colNames = ["a", "b", "c", "d", "e", "f", "g", "h"];

            boardHTML += "<tr><th></th>";
            colNames.forEach(file => {
                boardHTML += `<th>${file.toUpperCase()}</th>`;
            });
            boardHTML += "</tr>";

            chessboard.forEach((row, rowIndex) => {
                let rank = rowNames[rowIndex]; 
                boardHTML += `<tr><th>${rank}</th>`;

                colNames.forEach((file) => {
                    let square = file + rank;
                    let piece = row[square] || "&nbsp;";
                    boardHTML += `<td>${piece}</td>`;
                });

                boardHTML += `<th>${rank}</th>`;
                boardHTML += "</tr>";
            });
            boardHTML += "<tr><th></th>";
            colNames.forEach(file => {
                boardHTML += `<th>${file.toUpperCase()}</th>`;
            });
            boardHTML += "</tr>";

            boardHTML += "</table>";
            document.getElementById("chessboard").innerHTML = boardHTML;

        })
    }

    xhr.send();
