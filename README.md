
# Laz Redirect

## 這是什麼?

起因就是我懶

我在A網站看到某繪師資訊, 要在B網站找跟他相關的東西, 就必須複製繪師名字, 然後再一連串的搜尋, 而且B網站C網站也不見得是用繪師名字, 有可能是繪師帳號, 繪師id, 我覺得太麻煩, 於是就有了這個擴充.

## 怎麼裝?

1. Chromium的瀏覽器應該都能用(Edge, Chrome, Brave, Vivaldi...)
2. 載下來解壓成資料夾
3. 到 `管理擴充功能` 的畫面
4. 啟用 `開發人員模式`
5. 按 `載入為封裝項目` 的按鈕
6. 選剛剛解壓的資料夾
7. 沒意外就能看到擴充載入到擴充清單最上面

## 怎麼用?

在正確的頁面按瀏覽器上面的 Laz Redirect 擴充的圖示 ![ext](./images/icon48.png), 頁面對了就會開啟相應的連結, 就這樣.

目前圖示上顯示的laz沒有任何意義, 純粹是圖在我深色主題太黑看不見才加點字上去, 之後再考慮讓它顯示點什麼有用的資訊

## 目前支援的網站
### Kemono
- Pixiv
  - 繪師首頁(pixiv.net/users/xxxxxx) > Kemono Fanbox
  - 作品頁面(pixiv.net/artworks/xxxxxx) > Kemono Fanbox
  - 在上面兩個頁面會同時撈頁面裡的Fanbox和Fantia連結, 有找到就會順便打開
- Fanbox
  - 繪師首頁(fanbox.cc/@name/) > Kemono Fanbox
  - 作品頁面(fanbox.cc/@name/posts/xxxxxxxxx) > Kemono Fanbox
- Fantia
  - 繪師首頁(fantia.jp/fanclubs/xxxxxxxxx) > Kemono Fantia
  - 作品頁面(fantia.jp/posts/xxxxxxxxx) > Kemono Fantia
- Patreon
  - 繪師頁面(patreon.com/xxxxxxxxx) > Kemono Patreon
- DLsite
  - 作者頁面(dlsite.com/home/circle/profile/=/maker_id/RGxxxxxxx.html) > Kemono DLsite

### 圖床
- Danbooru
  - 繪師資訊(danbooru.donmai.us/artists/xxxxxx) > Gelbooru繪師搜尋
- Gelbooru
  - 作品頁面(gelbooru.com/index.php?page=post&s=view&id=xxxxxxxx) > Danbooru繪師資訊
- Twitter (X)
  - 動態(twitter.com/xxxxxxx) > Danbooru繪師資訊

### 其他
- Misskey.io
  - 繪師動態(misskey.io\/@name) > misskey.art
- Facebook
  - 個人動態(facebook.com/profile.php?id=xxxxxxxxxxxxx) > 貼文搜尋
  - 個人動態(facebook.com/custom-name/) > 貼文搜尋
  - 社團成員(facebook.com/groups/xxxxxxxxx/user/xxxxxxxxxx/) > 貼文搜尋



