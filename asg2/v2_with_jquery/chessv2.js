$(document).ready(function () {
    render_chessboard(); 

    $(".btn-danger").click(function () {
        location.reload();
    });

    $(".btn-primary").click(function () {
        makeMove();
    });
});

function makeMove() {
    let src = $("#src").val().trim().toLowerCase();
    let dst = $("#dst").val().trim().toLowerCase();
    let srcCell = $("#" + src);
    let dstCell = $("#" + dst);
    if (srcCell.length === 0 || dstCell.length === 0 || src === dst) {
        alert("Invalid move! Enter valid chess coordinates (e.g., e2 to e4).");
        return false;
    }
    dstCell.html(srcCell.html());
    srcCell.html("&nbsp;");
    $("#src, #dst").val("");
    return false;
}

function render_chessboard() {
    $.getJSON("chessboard.json", function (data) {
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

                boardHTML += `<td id="${square}">${piece}</td>`;
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
        $("#chessboard").html(boardHTML);
    });
}
