const express = require("express");
const axios = require("axios");
const app = express();
const port = process.env.PORT || 3000; // 使用环境变量 PORT，或默认到 3000

const cors = require("cors");
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

// 允许跨域访问
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// 定义API路由
app.get("/", (req, res) => {
  res.send("Hello World!");
});
//這是輸入請求的api
app.get("/api/images", async (req, res) => {
  const tag = req.query.tag || "default"; // 从查询参数获取搜索关键字
  const page = req.query.page; //這裏獲取到頁數
  const purity = req.query.purity; //這裏獲取圖片種類
  const apiKey = "B0HGeZFmcMHO6iOL6729XYNVyqeYT5HK"; // 你的 Wallhaven API Key
  // const seed = Math.random().toString(36).substring(2, 8); // 生成随机种子
  // const randomParam = new Date().getTime();
  const ImgDB = `https://wallhaven.cc/api/v1/search?apikey=${apiKey}&q=${encodeURIComponent(
    tag
  )}&page=${page}&categories=011&purity=${purity}`;

  try {
    const response = await axios.get(ImgDB);
    res.json(response.data); // 返回响应数据
  } catch (error) {
    res.status(500).send("Error fetching images");
  }
});
//這是圖片顯示錯誤的，
app.get("/proxy-image", async (req, res) => {
  const url = req.query.url;
  try {
    const response = await axios.get(url, {
      responseType: "arraybuffer", // 确保获取为二进制数据
    });
    res.set("Content-Type", response.headers["content-type"]);
    res.send(response.data);
  } catch (error) {
    res.status(500).send("Error fetching image");
  }
});
//這裏獲取到特定類別的圖片
app.get("/sorting-image", async (req, res) => {
  const page = req.query.page; //這裏獲取到頁數
  const purity = req.query.purity; //這裏獲取圖片種類
  const sort = req.query.data;
  const tag = req.query.tag;
  const apiKey = "B0HGeZFmcMHO6iOL6729XYNVyqeYT5HK"; // 你的 Wallhaven API Key
  const ImgDB = `https://wallhaven.cc/api/v1/search?apikey=${apiKey}&q=${encodeURIComponent(
    tag
  )}&page=${page}&categories=011&purity=${purity}&sorting=${sort}`;

  try {
    const response = await axios.get(ImgDB);
    res.json(response.data); // 返回响应数据
  } catch (error) {
    res.status(500).send("Error fetching images");
  }
});

//使用時間熱度來排序圖片
app.get("/time-sorting-image", async (req, res) => {
  const page = req.query.page; //這裏獲取到頁數
  const purity = req.query.purity; //這裏獲取圖片種類
  const tag = req.query.tag;
  const time = req.query.time;
  const apiKey = "B0HGeZFmcMHO6iOL6729XYNVyqeYT5HK"; // 你的 Wallhaven API Key
  const ImgDB = `https://wallhaven.cc/api/v1/search?apikey=${apiKey}&q=${encodeURIComponent(
    tag
  )}&page=${page}&categories=011&purity=${purity}&topRange=${time}`;

  try {
    const response = await axios.get(ImgDB);
    res.json(response.data); // 返回响应数据
  } catch (error) {
    res.status(500).send("Error fetching images");
  }
});
// 启动服务器
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
