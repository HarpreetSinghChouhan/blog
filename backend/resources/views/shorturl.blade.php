<!DOCTYPE html>
<html>

<head>
    <title>Verification Code</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
</head>
<script>
    document.addEventListener("DOMContentLoaded", function() {
        function Filldata(data) {
            let table = document.getElementById('TableBody');
            let html = "";
            data.map((url, index) => {
                html += `<tr> <td> ${index}</td>
                <td ><a href="/slug/${url.shorturl}" target="_black">${url.shorturl}  </a></td>
                <td>${url.correcturl}</td>
                <td>${url.created_at}</td>
             </tr>`
            })
            table.innerHTML = html;
        }
        fetch("{{ route('AllData') }}", {
                method: "GET",
            })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                Filldata(data.message);
            });
    })
</script>

<body>
    <div class="container">
        <a href="/slug"> Create New Slug</a>
        <div class="text-center">
            <h2> All Short URLS</h2>
        </div>
        <table class="table ">
            <thead class="">
                <tr>
                    <td>ID </td>
                    <td> Short URl</td>
                    <td>Correct Url </td>
                    <td> Created At </td>
                </tr>
            <tbody id="TableBody">

            </tbody>
            </thead>
        </table>
    </div>
</body>

</html>