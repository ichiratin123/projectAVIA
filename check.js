let api_url = "https://db.ygoprodeck.com/api/v7/cardinfo.php";
fetch(api_url)
    .then(res => res.json())
    .then(data=> console.log(data))
