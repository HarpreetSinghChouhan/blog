<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=\, initial-scale=1.0">
    <title>Create Slug</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
</head>
<script>
    document.addEventListener("DOMContentLoaded", function() {
        document.getElementById('URL').addEventListener("click", function() {
            window.location.href = "shorturl";
        })

        function myFunction() {
            // console.log("Hello Every One");
        }
        document.getElementById("submit").addEventListener("submit", function(e) {
            e.preventDefault();
            let formData = new FormData(this);
            console.log("From data", formData);
            fetch("{{ route('create-url') }}", {
                    method: "POST",
                    body: formData
                })
                .then(res => res.json())
                .then(data => {
                    // console.log(data);
                    let input = document.getElementById('slug');
                    input.value = '';
                    let link = document.getElementById('shorturl')
                    link.innerHTML = "http://localhost:8000/slug/" + data.shortslug;
                    link.href = `/slug/${data.shortslug}`;
                });
            myFunction();
        });
    });
</script>

<body>
    <div class="container border-2 p-4">
        <button style="margin-top: 10px;" class="btn btn-success mt-3 " id="URL"> Check All Url </button>

        <form method="post" id="submit" class="w-2/3" role="form"> 
            <legend>Form title</legend> 

            <div class="form-group">
                <label for="">Enter Slug</label>
                <input type="url" class="form-control" id="slug" name="slug" placeholder="Input field" required >
            </div>
            <button type="submit" class="btn btn-primary">Create URL</button>
        </form>
        
        <div>
            <h5 id="">short url <a href="" id="shorturl"> </a></h5>
        </div>
    </div>

</body>

</html>