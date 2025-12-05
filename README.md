# baytekcollection
Baytek Collection, modern tasarım anlayışıyla dekorasyon ve aksesuar kategorisinde şık, estetik ve dayanıklı ürünler sunar. Kullanıcı odaklı yaklaşımıyla kaliteyi, ulaşılabilir fiyatı ve özgün tasarım çizgisini bir araya getirerek keyifli bir alışveriş deneyimi sağlar.
<!DOCTYPE html>
<html lang="tr">
<head>
<meta charset="UTF-8">
<title>Baytek Collection</title>

<style>
    body {
        margin: 0;
        font-family: 'Poppins', sans-serif;
        background: linear-gradient(135deg, #111, #2b0034, #43005a);
        background-size: 300% 300%;
        animation: bgMove 10s infinite alternate;
        color: white;
        text-align: center;
    }

    @keyframes bgMove {
        0% {background-position: 0% 50%;}
        100% {background-position: 100% 50%;}
    }

    .title {
        font-size: 60px;
        margin-top: 100px;
        letter-spacing: 4px;
        text-transform: uppercase;
        font-weight: 900;
        text-shadow: 0 0 20px #ff00f7, 0 0 40px #ff00f7;
        animation: glow 2s infinite alternate;
    }

    @keyframes glow {
        0% {text-shadow: 0 0 15px #ff00f7;}
        100% {text-shadow: 0 0 40px #ff00f7;}
    }

    .subtitle {
        font-size: 22px;
        margin-top: 10px;
        opacity: 0.8;
        letter-spacing: 2px;
    }

    .card {
        width: 80%;
        max-width: 600px;
        margin: 50px auto;
        background: rgba(255, 255, 255, 0.1);
        padding: 30px;
        border-radius: 20px;
        backdrop-filter: blur(10px);
        box-shadow: 0 0 30px rgba(255, 0, 200, 0.3);
        animation: cardShow 1.5s ease;
    }

    @keyframes cardShow {
        from {transform: translateY(40px); opacity: 0;}
        to {transform: translateY(0); opacity: 1;}
    }

    .btn {
        margin-top: 25px;
        padding: 15px 40px;
        font-size: 18px;
        border: none;
        border-radius: 50px;
        cursor: pointer;
        background: linear-gradient(45deg, #ff00ff, #ff0066);
        color: white;
        box-shadow: 0px 0px 25px #ff00ff;
        transition: 0.3s;
    }

    .btn:hover {
        transform: scale(1.1);
        box-shadow: 0px 0px 40px #ff00ff;
    }
</style>

</head>
<body>

<h1 class="title">Baytek Collection</h1>
<p class="subtitle">Modern • Şık • Parlak • Premium Tasarımlar</p>

<div class="card">
    <h2>Hoş Geldiniz</h2>
    <p>
        Baytek Collection; modern tasarım, estetik dokunuş ve dikkat çekici ürünleriyle öne çıkan bir koleksiyondur.
        Görenin bir daha baktığı, tarzınıza tarz katan özel ürünler sunar.
    </p>
    <button class="btn">Keşfet</button>
</div>

</body>
</html>
