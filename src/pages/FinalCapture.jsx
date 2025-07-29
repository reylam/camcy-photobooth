import { useState, useRef, useEffect } from "react";
import {
  Stage,
  Layer,
  Image as KonvaImage,
  Rect,
  Text,
  Group,
} from "react-konva";
import {
  Download,
  ChevronLeft,
  Upload,
  Smile,
  Type,
  Image as ImageIcon,
  RotateCcw,
  RotateCw,
  Share2,
  Instagram,
  MessageSquare,
  X,
  Eye,
  EyeOff,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
//

// Import template images
import colorfullStrip from "../assets/strip/colorfull.png";
import cuteStrip from "../assets/strip/cute.png";
import halloweenStrip from "../assets/strip/halloween.png";
import spaceStrip from "../assets/strip/space.png";
import strawHatStrip from "../assets/strip/straw_hat_advanture.png";
import night from "../assets/strip/night.png";
import racingSport from "../assets/strip/racing_sport.png";
import onepiece from "../assets/strip/one-piece.png";
import gamePixel from "../assets/strip/game_pixel.png";
import coboy from "../assets/strip/coboy.png";
import rrq from "../assets/strip/rrq.png";

// Import template assets
import halloweenCat from "../assets/strip/halloween_assets/cat.png";
import halloweenSign from "../assets/strip/halloween_assets/sign.png";
import halloweenCatWall from "../assets/strip/halloween_assets/cat_wall.png";

import cuteCatMellow from "../assets/strip/cute/cat_mellow.png";
import cuteKiyowo from "../assets/strip/cute/kiyowoo.png";

import colorfulChatLeft from "../assets/strip/colorful/chat_left.png";
import colorfulChatRight from "../assets/strip/colorful/chat_right.png";

import spaceAstronot from "../assets/strip/space/astronot_dab.png";
import spaceMeteor from "../assets/strip/space/meteor_duar.png";

import pirateLuffy from "../assets/strip/pirate/d-luffy.png";
import pirateDevilFruit from "../assets/strip/pirate/devil_fruit.png";
import pirateLuffyHat from "../assets/strip/pirate/luffy_hat.png";

import gamePixelSign from "../assets/strip/game_pixel/sign_pixel.png";
import gamePixelStar from "../assets/strip/game_pixel/star.png";

import coboyMoneyBar from "../assets/strip/coboy/money_bar.png";
import coboyHorse from "../assets/strip/coboy/horse.png";
import coboySaloonSign from "../assets/strip/coboy/saloon_sign.png";
import coboyGate from "../assets/strip/coboy/gate.png";

import narutoSummoner from "../assets/strip/naruto/summoner.png";
import narutoSymbolNaruto from "../assets/strip/naruto/symbol_naruto.png";
import narutoUchiha from "../assets/strip/naruto/uchiha.png";

import raceLogo from "../assets/strip/racing_sport/logo_f1.png";
import raceWheel from "../assets/strip/racing_sport/wheel.png";

import rrqBomb from "../assets/strip/rrq/bomb.png";
import rrqBoxHead from "../assets/strip/rrq/box_head.png";
import rrqOvalHead from "../assets/strip/rrq/oval_head.png";
import rrqHastag from "../assets/strip/rrq/hastag_runner.png";

// Template data with precise photo positions
const templates = [
  {
    id: "rrq",
    name: "RRQ",
    image: rrq,
    photoCount: 2,
    dimensions: { width: 800, height: 374 },
    photoPositions: [
      { x: 30, y: 58, width: 362, height: 246 },
      { x: 411, y: 58, width: 362, height: 246 },
    ],
    assets: [
      {
        id: "runner_up",
        image: rrqHastag,
        x: 13,
        y: 38,
        width: 65,
        height: 65,
        preview: rrqHastag,
      },
      {
        id: "bomb",
        image: rrqBomb,
        x: 720,
        y: 40,
        width: 75,
        height: 75,
        preview: rrqBomb,
      },
      {
        id: "box_head",
        image: rrqBoxHead,
        x: 10,
        y: 288,
        width: 65,
        height: 65,
        preview: rrqBoxHead,
      },
      {
        id: "oval_head",
        image: rrqOvalHead,
        x: 750,
        y: 275,
        width: 70,
        height: 70,
        preview: rrqOvalHead,
      },
    ],
  },
  {
    id: "night",
    name: "Night",
    image: night,
    photoCount: 2,
    dimensions: { width: 292, height: 876 },
    photoPositions: [
      { x: 20, y: 70, width: 253, height: 177 },
      { x: 20, y: 260, width: 253, height: 177 },
    ],
  },
  {
    id: "game-pixel",
    name: "Pixel Game",
    image: gamePixel,
    photoCount: 2,
    dimensions: { width: 800, height: 374 },
    photoPositions: [
      { x: 26, y: 57, width: 370, height: 259 },
      { x: 407, y: 57, width: 370, height: 259 },
    ],
    assets: [
      {
        id: "star_left_top",
        image: gamePixelStar,
        x: 17,
        y: 40,
        width: 50,
        height: 50,
        preview: gamePixelStar,
      },
      {
        id: "star_right_top",
        image: gamePixelStar,
        x: 740,
        y: 40,
        width: 50,
        height: 50,
        preview: gamePixelStar,
      },
      {
        id: "star_left_bottom",
        image: gamePixelStar,
        x: 17,
        y: 280,
        width: 50,
        height: 50,
        preview: gamePixelStar,
      },
      {
        id: "star_right_bottom",
        image: gamePixelStar,
        x: 740,
        y: 280,
        width: 50,
        height: 50,
        preview: gamePixelStar,
      },
      {
        id: "sign_pixel",
        image: gamePixelSign,
        x: 365,
        y: 55,
        width: 70,
        height: 70,
        preview: gamePixelSign,
      },
    ],
  },
  {
    id: "coboy",
    name: "Cowboy",
    image: coboy,
    photoCount: 2,
    dimensions: { width: 800, height: 374 },
    photoPositions: [
      { x: 21, y: 19, width: 370, height: 259 },
      { x: 410, y: 103, width: 370, height: 259 },
    ],
    assets: [
      {
        id: "money_bar",
        image: coboyMoneyBar,
        x: -10,
        y: 232,
        width: 85,
        height: 85,
        preview: coboyMoneyBar,
      },
      {
        id: "horse",
        image: coboyHorse,
        x: 321,
        y: 212,
        width: 90,
        height: 90,
        preview: coboyHorse,
      },
      {
        id: "saloon_sign",
        image: coboySaloonSign,
        x: 515,
        y: 20,
        width: 160,
        height: 98,
        preview: coboySaloonSign,
      },
      {
        id: "gate_bar",
        image: coboyGate,
        x: 550,
        y: 290,
        width: 90,
        height: 90,
        preview: coboyGate,
      },
    ],
  },
  // 3 PHOTOS
  {
    id: "colorfull",
    name: "Colorful",
    image: colorfullStrip,
    photoCount: 3,
    dimensions: { width: 292, height: 876 },
    photoPositions: [
      { x: 20, y: 130, width: 253, height: 177 },
      { x: 20, y: 332, width: 253, height: 177 },
      { x: 20, y: 544, width: 253, height: 177 },
    ],
    assets: [
      {
        id: "chat_right",
        image: colorfulChatRight,
        x: 203,
        y: 270,
        width: 80,
        height: 80,
        preview: colorfulChatRight,
      },
      {
        id: "chat_left",
        image: colorfulChatLeft,
        x: 28,
        y: 480,
        width: 80,
        height: 80,
        preview: colorfulChatLeft,
      },
    ],
  },
  {
    id: "cute",
    name: "Cute",
    image: cuteStrip,
    photoCount: 3,
    dimensions: { width: 292, height: 876 },
    photoPositions: [
      { x: 20, y: 75, width: 253, height: 177 },
      { x: 20, y: 297, width: 253, height: 177 },
      { x: 20, y: 519, width: 253, height: 177 },
    ],
    assets: [
      {
        id: "cat_mellow",
        image: cuteCatMellow,
        x: 0,
        y: 220,
        width: 100,
        height: 100,
        preview: cuteCatMellow,
      },
      {
        id: "kiyowoo",
        image: cuteKiyowo,
        x: 210,
        y: 440,
        width: 80,
        height: 80,
        preview: cuteKiyowo,
      },
    ],
  },
  {
    id: "halloween",
    name: "Halloween",
    image: halloweenStrip,
    photoCount: 3,
    dimensions: { width: 292, height: 876 },
    photoPositions: [
      { x: 20, y: 75, width: 253, height: 177 },
      { x: 20, y: 297, width: 253, height: 177 },
      { x: 20, y: 519, width: 253, height: 177 },
    ],
    assets: [
      {
        id: "cat",
        image: halloweenCat,
        x: 160,
        y: 468,
        width: 110,
        height: 60,
        preview: halloweenCat,
      },
      {
        id: "sign",
        image: halloweenSign,
        x: 86,
        y: 30,
        width: 125,
        height: 70,
        preview: halloweenSign,
      },
      {
        id: "catWall",
        image: halloweenCatWall,
        x: 0 - 26,
        y: 197,
        width: 150,
        height: 150,
        preview: halloweenCatWall,
      },
    ],
    textOptions: [
      {
        id: "halloween-text",
        x: 60,
        y: 700,
        defaultText: "Happy Halloween!",
        color: "white",
        fontSize: 20,
      },
    ],
  },
  {
    id: "space",
    name: "Space",
    image: spaceStrip,
    photoCount: 3,
    dimensions: { width: 292, height: 876 },
    photoPositions: [
      { x: 0, y: 90, width: 253, height: 177 },
      { x: 297 - 253, y: 307, width: 253, height: 177 },
      { x: 0, y: 524, width: 253, height: 177 },
    ],
    assets: [
      {
        id: "astronot_dab",
        image: spaceAstronot,
        x: 0,
        y: 440,
        width: 105,
        height: 105,
        preview: spaceAstronot,
      },
      {
        id: "meteor",
        image: spaceMeteor,
        x: 175,
        y: 225,
        width: 100,
        height: 100,
        preview: spaceMeteor,
      },
    ],
  },
  {
    id: "one-piece",
    name: "Pirate",
    image: onepiece,
    photoCount: 3,
    dimensions: { width: 292, height: 876 },
    photoPositions: [
      { x: 20, y: 20, width: 253, height: 177 },
      { x: 20, y: 227, width: 242, height: 177 },
      { x: 20, y: 434, width: 253, height: 177 },
    ],
    assets: [
      {
        id: "luffy",
        image: pirateLuffy,
        x: 51,
        y: 200,
        width: 187,
        height: 33,
        preview: pirateLuffy,
      },
      {
        id: "devil-fruit",
        image: pirateDevilFruit,
        x: 213,
        y: 5,
        width: 75,
        height: 75,
        preview: pirateDevilFruit,
      },
      {
        id: "luffy-hat",
        image: pirateLuffyHat,
        x: 0,
        y: 8,
        width: 90,
        height: 90,
        preview: pirateLuffyHat,
      },
    ],
  },

  //4 Photos
  {
    id: "straw_hat_adventure",
    name: "Straw Hat Adventure",
    image: strawHatStrip,
    photoCount: 4,
    dimensions: { width: 292, height: 940 },
    photoPositions: [
      { x: 20, y: 100, width: 252, height: 177 },
      { x: 20, y: 292, width: 252, height: 177 },
      { x: 20, y: 484, width: 252, height: 177 },
      { x: 20, y: 676, width: 252, height: 177 },
    ],
    assets: [
      {
        id: "uchiha-left-top",
        image: narutoUchiha,
        x: -5,
        y: 250,
        width: 70,
        height: 70,
        preview: narutoUchiha,
      },
      {
        id: "symbol-right-top",
        image: narutoSymbolNaruto,
        x: 210,
        y: 250,
        width: 120,
        height: 70,
        preview: narutoSymbolNaruto,
      },
      {
        id: "symbol-left-top",
        image: narutoSymbolNaruto,
        x: -30,
        y: 640,
        width: 120,
        height: 70,
        preview: narutoSymbolNaruto,
      },
      {
        id: "uchiha-right-bottom",
        image: narutoUchiha,
        x: 230,
        y: 640,
        width: 70,
        height: 70,
        preview: narutoUchiha,
      },
      {
        id: "summon",
        image: narutoSummoner,
        x: 110,
        y: 443,
        width: 70,
        height: 70,
        preview: narutoSummoner,
      },
    ],
  },
  {
    id: "racing_sport",
    name: "Racing Sport",
    image: racingSport,
    photoCount: 4,
    dimensions: { width: 876, height: 565.49 },
    photoPositions: [
      { x: 85, y: 58, width: 336, height: 206 },
      { x: 87, y: 288, width: 336, height: 206 },
      { x: 453, y: 92, width: 336, height: 206 },
      { x: 454, y: 323, width: 336, height: 206 },
    ],
    assets: [
      {
        id: "logo_f1",
        image: raceLogo,
        x: 350,
        y: 280,
        width: 170,
        height: 80,
        preview: raceLogo,
      },
      {
        id: "wheel",
        image: raceWheel,
        x: 55,
        y: 455,
        width: 90,
        height: 90,
        preview: raceWheel,
      },
    ],
  },
];

// Sticker options (SVG and emoji)
const stickerOptions = [
  {
    id: "balloon-heart",
    content: "❤",
    type: "emoji",
    emoji: "❤",
  },
  { id: "smile", content: "😊", type: "emoji", emoji: "😊" },
  { id: "heart", content: "❤", type: "emoji", emoji: "❤" },
  { id: "star", content: "🌟", type: "emoji", emoji: "🌟" },
  { id: "party", content: "🎉", type: "emoji", emoji: "🎉" },
  { id: "camera", content: "📷", type: "emoji", emoji: "📷" },
  { id: "sparkle", content: "✨", type: "emoji", emoji: "✨" },
  { id: "thumbsup", content: "👍", type: "emoji", emoji: "👍" },
  { id: "hundred", content: "💯", type: "emoji", emoji: "💯" },
];

export default function FinalCapture() {
  const location = useLocation();
  const navigate = useNavigate();
  const stageRef = useRef(null);
  const [frameColor, setFrameColor] = useState("#ffffff");
  const [frameWidth, setFrameWidth] = useState(20);
  const [layout, setLayout] = useState("vertical");
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [templateImage, setTemplateImage] = useState(null);
  const [images, setImages] = useState([]);
  const [mode, setMode] = useState("custom");
  const [loadedImages, setLoadedImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [customText, setCustomText] = useState("camcy photo booth");
  const [textColor, setTextColor] = useState("#333333");
  const [textFontSize, setTextFontSize] = useState(20);
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [showStickers, setShowStickers] = useState(false);
  const [stickers, setStickers] = useState([]);
  const [templateAssets, setTemplateAssets] = useState([]);
  const [activeTemplateAssets, setActiveTemplateAssets] = useState([]);
  const [templateTexts, setTemplateTexts] = useState([]);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [showTemplateAssets, setShowTemplateAssets] = useState(false);
  const [customTexts, setCustomTexts] = useState([]);
  const [isSwitchingMode, setIsSwitchingMode] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const [isWideScreen, setIsWideScreen] = useState(false);
  const [dateTimeConfig, setDateTimeConfig] = useState({
    show: true,
    position: { x: 10, y: 10 },
    fontSize: 14,
    dateFontSize: 12,
    timeFontSize: 16,
    backgroundColor: "rgba(0,0,0,0.7)",
    textColor: "white",
    cornerRadius: 5,
    padding: 10,
    width: 180,
  });

  // Animation state
  const [animationState, setAnimationState] = useState({
    controls: "entering",
    preview: "entering",
  });

  // Check viewport size
  useEffect(() => {
    const checkViewport = () => {
      setIsMobileView(window.innerWidth < 380);
      setIsWideScreen(window.innerWidth >= 1545);
    };

    checkViewport();
    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  // Load images from navigation state
  useEffect(() => {
    if (location.state?.images) {
      setIsLoading(true);
      setImages(location.state.images);

      const loadImages = async () => {
        try {
          const loaded = await Promise.all(
            location.state.images.map(async (img) => {
              const imageObj = new window.Image();
              imageObj.src = img.src;
              await new Promise((resolve) => {
                imageObj.onload = resolve;
                imageObj.onerror = () => {
                  console.error("Failed to load image:", img.src);
                  resolve(imageObj);
                };
              });
              return imageObj;
            })
          );
          setLoadedImages(loaded);
          setIsLoading(false);
          saveHistory();
          setAnimationState({
            controls: "entered",
            preview: "entered",
          });
        } catch (error) {
          console.error("Error loading images:", error);
          setIsLoading(false);
        }
      };

      loadImages();
    }
  }, [location.state]);

  // Load template image and assets when selected
  useEffect(() => {
    if (selectedTemplate) {
      setIsLoading(true);
      const img = new window.Image();
      img.src = selectedTemplate.image;
      img.onload = () => {
        setTemplateImage(img);

        if (selectedTemplate.assets) {
          const loadAssets = selectedTemplate.assets.map((asset) => {
            return new Promise((resolve) => {
              const assetImg = new window.Image();
              assetImg.src = asset.image;
              assetImg.onload = () =>
                resolve({
                  ...asset,
                  image: assetImg,
                });
              assetImg.onerror = () => resolve(null);
            });
          });

          Promise.all(loadAssets).then((loadedAssets) => {
            const filteredAssets = loadedAssets.filter(
              (asset) => asset !== null
            );
            setTemplateAssets(filteredAssets);
            setActiveTemplateAssets([]);
          });
        } else {
          setTemplateAssets([]);
          setActiveTemplateAssets([]);
        }

        if (selectedTemplate.textOptions) {
          setTemplateTexts(
            selectedTemplate.textOptions.map((textOpt) => ({
              ...textOpt,
              text: textOpt.defaultText,
            }))
          );
        } else {
          setTemplateTexts([]);
        }

        setIsLoading(false);
        saveHistory();
      };
      img.onerror = () => {
        console.error("Failed to load template image:", selectedTemplate.image);
        setIsLoading(false);
      };
    } else {
      setTemplateImage(null);
      setTemplateAssets([]);
      setActiveTemplateAssets([]);
      setTemplateTexts([]);
    }
  }, [selectedTemplate]);

  // Add new custom text
  const addCustomText = () => {
    const newText = {
      id: Date.now(),
      text: "New Text",
      x: 50,
      y: 50,
      color: "#000000",
      fontSize: 20,
    };
    setCustomTexts([...customTexts, newText]);
    saveHistory();
  };

  // Remove custom text
  const removeCustomText = (id) => {
    setCustomTexts(customTexts.filter((text) => text.id !== id));
    saveHistory();
  };

  // Update custom text
  const updateCustomText = (id, field, value) => {
    setCustomTexts(
      customTexts.map((text) =>
        text.id === id ? { ...text, [field]: value } : text
      )
    );
    saveHistory();
  };

  const formatDateTime = () => {
    const now = new Date();
    const dateOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const timeOptions = {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };

    return {
      date: now.toLocaleDateString("en-US", dateOptions),
      time: now.toLocaleTimeString("en-US", timeOptions),
    };
  };

  // Toggle template asset
  const toggleTemplateAsset = (assetId) => {
    const asset = templateAssets.find((a) => a.id === assetId);
    if (!asset) return;

    setActiveTemplateAssets((prev) => {
      if (prev.some((a) => a.id === assetId)) {
        return prev.filter((a) => a.id !== assetId);
      } else {
        return [...prev, asset];
      }
    });
    saveHistory();
  };

  // Update template text size
  const updateTemplateTextSize = (index, size) => {
    const newTemplateTexts = [...templateTexts];
    newTemplateTexts[index].fontSize = size;
    setTemplateTexts(newTemplateTexts);
    saveHistory();
  };

  // Save current state to history
  const saveHistory = () => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push({
      frameColor,
      frameWidth,
      layout,
      customText,
      textColor,
      textFontSize,
      backgroundImage,
      stickers,
      templateTexts,
      activeTemplateAssets,
      customTexts,
      dateTimeConfig,
    });
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  // Undo action
  const undo = () => {
    if (historyIndex > 0) {
      const prevState = history[historyIndex - 1];
      applyHistoryState(prevState);
      setHistoryIndex(historyIndex - 1);
    }
  };

  // Redo action
  const redo = () => {
    if (historyIndex < history.length - 1) {
      const nextState = history[historyIndex + 1];
      applyHistoryState(nextState);
      setHistoryIndex(historyIndex + 1);
    }
  };

  // Apply history state
  const applyHistoryState = (state) => {
    setFrameColor(state.frameColor);
    setFrameWidth(state.frameWidth);
    setLayout(state.layout);
    setCustomText(state.customText);
    setTextColor(state.textColor);
    setTextFontSize(state.textFontSize);
    setBackgroundImage(state.backgroundImage);
    setStickers(state.stickers);
    if (state.templateTexts) {
      setTemplateTexts(state.templateTexts);
    }
    if (state.activeTemplateAssets) {
      setActiveTemplateAssets(state.activeTemplateAssets);
    }
    if (state.customTexts) {
      setCustomTexts(state.customTexts);
    }
    if (state.dateTimeConfig) {
      setDateTimeConfig(state.dateTimeConfig);
    }
  };

  // Handle background image upload
  const handleBackgroundUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new window.Image();
        img.src = event.target.result;
        img.onload = () => {
          setBackgroundImage(img);
          saveHistory();
        };
      };
      reader.readAsDataURL(file);
    }
  };

  // Add sticker to the strip
  const addSticker = (sticker) => {
    const newStickers = [
      ...stickers,
      {
        id: Date.now(),
        content: sticker.content,
        type: sticker.type,
        x: Math.random() * 300,
        y: Math.random() * 300,
        fontSize: 30,
        rotation: Math.random() * 360,
      },
    ];
    setStickers(newStickers);
    saveHistory();
  };

  // Remove sticker
  const removeSticker = (id) => {
    const newStickers = stickers.filter((sticker) => sticker.id !== id);
    setStickers(newStickers);
    saveHistory();
  };

  // Update template text
  const updateTemplateText = (index, text) => {
    const newTemplateTexts = [...templateTexts];
    newTemplateTexts[index].text = text;
    setTemplateTexts(newTemplateTexts);
    saveHistory();
  };

  // Share to Instagram
  const shareToInstagram = () => {
    if (!stageRef.current) return;

    const uri = stageRef.current.toDataURL({
      mimeType: "image/png",
      quality: 1,
      pixelRatio: 2,
    });

    const link = document.createElement("a");
    link.download = `photo-strip-${selectedTemplate?.id || "custom"}.png`;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    if (navigator.share) {
      navigator
        .share({
          title: "Photo Strip",
          text: "Check out my photo strip!",
          url: uri,
        })
        .catch(console.error);
    } else {
      window.open(
        `https://www.instagram.com/create/story/?backgroundImage=${encodeURIComponent(
          uri
        )}`,
        "_blank"
      );
    }
  };

  const toggleSwitchLoading = () => {
    setIsSwitchingMode(true);
    setTimeout(() => {
      setIsSwitchingMode(false);
    }, 1000);
  };

  // Share to WhatsApp
  const shareToWhatsApp = () => {
    if (!stageRef.current) return;

    const uri = stageRef.current.toDataURL({
      mimeType: "image/png",
      quality: 1,
      pixelRatio: 2,
    });

    const link = document.createElement("a");
    link.download = `photo-strip-${selectedTemplate?.id || "custom"}.png`;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    if (navigator.share) {
      navigator
        .share({
          title: "Photo Strip",
          text: "Check out my photo strip!",
          url: uri,
        })
        .catch(console.error);
    } else {
      window.open(
        `https://wa.me/?text=${encodeURIComponent(
          "Check out my photo strip!"
        )}&url=${encodeURIComponent(uri)}`,
        "_blank"
      );
    }
  };

  const downloadStrip = () => {
    if (!stageRef.current) return;

    const uri = stageRef.current.toDataURL({
      mimeType: "image/png",
      quality: 1,
      pixelRatio: 2,
    });

    const link = document.createElement("a");
    link.download = `photo-strip-${selectedTemplate?.id || "custom"}.png`;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const renderDateTime = () => {
    if (!dateTimeConfig.show) return null;

    const { date, time } = formatDateTime();
    const bgWidth = dateTimeConfig.width;
    const bgHeight =
      dateTimeConfig.dateFontSize +
      dateTimeConfig.timeFontSize +
      dateTimeConfig.padding * 3;

    return (
      <Group
        x={dateTimeConfig.position.x}
        y={dateTimeConfig.position.y}
        draggable
        onDragEnd={(e) => {
          setDateTimeConfig((prev) => ({
            ...prev,
            position: {
              x: e.target.x(),
              y: e.target.y(),
            },
          }));
          saveHistory();
        }}
      >
        <Rect
          width={bgWidth}
          height={bgHeight}
          fill={dateTimeConfig.backgroundColor}
          cornerRadius={dateTimeConfig.cornerRadius}
        />
        <Text
          text={date}
          x={dateTimeConfig.padding}
          y={dateTimeConfig.padding}
          fontSize={dateTimeConfig.dateFontSize}
          fill={dateTimeConfig.textColor}
          width={bgWidth - dateTimeConfig.padding * 2}
          align="center"
        />
        <Text
          text={time}
          x={dateTimeConfig.padding}
          y={dateTimeConfig.dateFontSize + dateTimeConfig.padding * 2}
          fontSize={dateTimeConfig.timeFontSize}
          fill={dateTimeConfig.textColor}
          fontStyle="bold"
          width={bgWidth - dateTimeConfig.padding * 2}
          align="center"
        />
      </Group>
    );
  };

  const renderCustomStrip = () => {
    if (loadedImages.length === 0) return null;

    const frameSize = frameWidth;
    const stripWidth = layout === "vertical" ? 400 : 800;
    const stripHeight = layout === "vertical" ? 800 : 400;
    const contentWidth = stripWidth - frameSize * 2;
    const contentHeight = stripHeight - frameSize * 2;

    // Calculate image sizes based on photo count
    let imgWidth, imgHeight, imgGap;

    if (layout === "horizontal") {
      if (images.length !== 2 && images.length !== 4) return null;

      imgWidth = (contentWidth - (images.length + 1) * 20) / images.length;
      imgHeight = contentHeight - 40;
      imgGap = 20;
    } else {
      imgWidth = contentWidth - 40;
      imgGap = 20;

      switch (images.length) {
        case 2:
          imgHeight = (contentHeight - imgGap * 3) / 2;
          break;
        case 3:
          imgHeight = (contentHeight - imgGap * 4) / 3;
          break;
        case 4:
          imgHeight = (contentHeight - imgGap * 5) / 4;
          break;
        default:
          imgHeight = (contentHeight - imgGap * 3) / 2;
      }
    }

    return (
      <Group>
        {/* Background with frame */}
        {backgroundImage ? (
          <KonvaImage
            image={backgroundImage}
            width={stripWidth}
            height={stripHeight}
            cornerRadius={5}
          />
        ) : (
          <Rect
            width={stripWidth}
            height={stripHeight}
            fill={frameColor}
            cornerRadius={5}
          />
        )}

        {/* Content area */}
        <Rect
          x={frameSize}
          y={frameSize}
          width={contentWidth}
          height={contentHeight}
          fill="#ffffff"
          cornerRadius={3}
        />

        {/* Images */}
        {loadedImages.map((imgObj, index) => {
          const imgAspectRatio = imgObj.width / imgObj.height;
          let finalWidth = imgWidth;
          let finalHeight = imgHeight;

          // Adjust to maintain aspect ratio
          if (imgAspectRatio > 1) {
            finalHeight = finalWidth / imgAspectRatio;
          } else {
            finalWidth = finalHeight * imgAspectRatio;
          }

          const xPos =
            layout === "vertical"
              ? frameSize + (contentWidth - finalWidth) / 2
              : frameSize + 20 + index * (imgWidth + imgGap);

          const yPos =
            layout === "vertical"
              ? frameSize + 20 + index * (imgHeight + imgGap)
              : frameSize + (contentHeight - finalHeight) / 2;

          return (
            <KonvaImage
              key={index}
              image={imgObj}
              x={xPos}
              y={yPos}
              width={finalWidth}
              height={finalHeight}
              cornerRadius={5}
            />
          );
        })}

        {/* Custom text - draggable */}
        <Text
          text={customText}
          x={frameSize + 20}
          y={stripHeight - frameSize - 40}
          fontSize={textFontSize}
          fontStyle="bold"
          fill={textColor}
          width={contentWidth - 40}
          align="center"
          draggable
          onDragEnd={(e) => {
            saveHistory();
          }}
        />

        {renderDateTime()}
        {/* Additional custom texts */}
        {customTexts.map((text) => (
          <Group
            key={text.id}
            x={text.x}
            y={text.y}
            draggable
            onDragEnd={(e) => {
              updateCustomText(text.id, "x", e.target.x());
              updateCustomText(text.id, "y", e.target.y());
            }}
          >
            <Text
              text={text.text}
              fontSize={text.fontSize}
              fill={text.color}
              fontStyle="bold"
            />
            <Rect
              x={-5}
              y={-5}
              width={text.text.length * (text.fontSize / 2) + 10}
              height={text.fontSize + 10}
              stroke="#ccc"
              strokeWidth={1}
              dash={[5, 5]}
              visible={true}
            />
          </Group>
        ))}

        {/* Stickers */}
        {stickers.map((sticker) => (
          <Group
            key={sticker.id}
            x={sticker.x}
            y={sticker.y}
            rotation={sticker.rotation}
            draggable
            onDragEnd={(e) => {
              const updatedStickers = stickers.map((s) =>
                s.id === sticker.id
                  ? { ...s, x: e.target.x(), y: e.target.y() }
                  : s
              );
              setStickers(updatedStickers);
            }}
            onClick={() => removeSticker(sticker.id)}
            onTransformEnd={(e) => {
              const node = e.target;
              const updatedStickers = stickers.map((s) =>
                s.id === sticker.id ? { ...s, rotation: node.rotation() } : s
              );
              setStickers(updatedStickers);
            }}
          >
            <Text
              text={sticker.content}
              fontSize={sticker.fontSize}
              fill={textColor}
            />
          </Group>
        ))}
      </Group>
    );
  };

  const renderTemplateStrip = () => {
    if (!selectedTemplate || !templateImage || loadedImages.length === 0)
      return null;

    // Filter templates that match the photo count
    const matchingTemplates = templates.filter(
      (template) => template.photoCount === images.length
    );

    if (!matchingTemplates.some((t) => t.id === selectedTemplate.id)) {
      // If selected template doesn't match photo count, auto-select first matching one
      const firstMatching = matchingTemplates[0];
      if (firstMatching) {
        setSelectedTemplate(firstMatching);
      }
      return null;
    }

    return (
      <Group>
        {/* Template background - full size with small corner radius */}
        <KonvaImage
          image={templateImage}
          width={selectedTemplate.dimensions.width}
          height={selectedTemplate.dimensions.height}
          cornerRadius={3}
        />

        {/* Overlay photos on template */}
        {loadedImages
          .slice(0, selectedTemplate.photoCount)
          .map((imgObj, index) => {
            const pos = selectedTemplate.photoPositions[index] || {
              x: 0,
              y: 0,
              width: 100,
              height: 100,
            };

            return (
              <KonvaImage
                key={index}
                image={imgObj}
                x={pos.x}
                y={pos.y}
                width={pos.width}
                height={pos.height}
                cornerRadius={3}
              />
            );
          })}

        {/* Active template assets */}
        {activeTemplateAssets.map((asset, index) => (
          <KonvaImage
            key={`asset-${index}`}
            image={asset.image}
            x={asset.x}
            y={asset.y}
            width={asset.width}
            height={asset.height}
          />
        ))}

        {/* Template texts */}
        {templateTexts.map((textOpt, index) => (
          <Group
            key={`text-${index}`}
            x={textOpt.x}
            y={textOpt.y}
            draggable
            onDragEnd={(e) => {
              const newTemplateTexts = [...templateTexts];
              newTemplateTexts[index].x = e.target.x();
              newTemplateTexts[index].y = e.target.y();
              setTemplateTexts(newTemplateTexts);
              saveHistory();
            }}
          >
            <Text
              text={textOpt.text}
              fontSize={textOpt.fontSize}
              fill={textOpt.color}
              fontStyle="bold"
            />
          </Group>
        ))}

        {/* Additional custom texts in template mode */}
        {customTexts.map((text) => (
          <Group
            key={text.id}
            x={text.x}
            y={text.y}
            draggable
            onDragEnd={(e) => {
              updateCustomText(text.id, "x", e.target.x());
              updateCustomText(text.id, "y", e.target.y());
            }}
          >
            <Text
              text={text.text}
              fontSize={text.fontSize}
              fill={text.color}
              fontStyle="bold"
            />
          </Group>
        ))}
        {renderDateTime()}
      </Group>
    );
  };

  const handleTemplateSelect = (template) => {
    if (template.photoCount === images.length) {
      setTimeout(() => {
        setSelectedTemplate(template);
        setMode("template");
        saveHistory();
        setIsSwitchingMode(false);
      }, 100);
    }
  };

  const handleCustomMode = () => {
    setTimeout(() => {
      setSelectedTemplate(null);
      setMode("custom");
      saveHistory();
      setIsSwitchingMode(false);
    }, 100);
  };

  // Filter templates by photo count and viewport
  const filteredTemplates = templates.filter(
    (template) => template.photoCount === images.length
  );

  // Animation styles
  const getAnimationStyle = (element) => {
    switch (animationState[element]) {
      case "entering":
        return { opacity: 0, transform: "translateY(20px)" };
      case "entered":
        return {
          opacity: 1,
          transform: "translateY(0)",
          transition: "all 0.3s ease-out",
        };
      default:
        return {};
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8">
      {(isLoading || isSwitchingMode) && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="text-center">
            <div className="animate-pulse flex flex-col items-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4">
                <div className="w-12 h-12 bg-white rounded-full animate-spin"></div>
              </div>
              <p className="text-xl animate-pulse">
                {isSwitchingMode
                  ? "Switching mode..."
                  : "Preparing your photos..."}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row gap-4 md:gap-8">
          {/* Controls */}
          <div
            className="w-full lg:w-1/4 bg-gray-900 p-4 md:p-6 rounded-xl"
            style={getAnimationStyle("controls")}
          >
            <h1 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">
              Strip Customization
            </h1>

            <div className="space-y-4 md:space-y-6">
              {/* Mode Selection */}
              <div>
                <h2 className="text-base md:text-lg font-semibold mb-2">
                  Mode
                </h2>
                <div className="flex gap-2">
                  <button
                    onClick={handleCustomMode}
                    className={`px-3 py-1 md:px-4 md:py-2 rounded-lg transition-all ${
                      mode === "custom"
                        ? "bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg"
                        : "bg-gray-800 hover:bg-gray-700"
                    }`}
                  >
                    Custom
                  </button>
                  <button
                    onClick={() => {
                      setMode("template");
                      toggleSwitchLoading();
                    }}
                    className={`px-3 py-1 md:px-4 md:py-2 rounded-lg transition-all ${
                      mode === "template"
                        ? "bg-gradient-to-r from-purple-600 to-purple-700 shadow-lg"
                        : "bg-gray-800 hover:bg-gray-700"
                    }`}
                    disabled={filteredTemplates.length === 0}
                  >
                    Template
                  </button>
                </div>
                {mode === "template" && filteredTemplates.length === 0 && (
                  <p className="text-xs md:text-sm text-red-400 mt-1">
                    No templates available for {images.length} photos
                  </p>
                )}
              </div>

              {mode === "template" ? (
                <div>
                  <h2 className="text-base md:text-lg font-semibold mb-2">
                    Templates
                  </h2>
                  {filteredTemplates.length > 0 ? (
                    <div className="grid grid-cols-2 gap-2">
                      {filteredTemplates.map((template) => {
                        const isHorizontal =
                          template.dimensions.width >
                          template.dimensions.height * 1.5;
                        const isMobileUnavailable =
                          isMobileView && isHorizontal && !isWideScreen;

                        return (
                          <button
                            key={template.id}
                            onClick={() =>
                              !isMobileUnavailable &&
                              handleTemplateSelect(template)
                            }
                            className={`p-1 md:p-2 rounded-lg flex flex-col items-center transition-all ${
                              selectedTemplate?.id === template.id
                                ? "bg-gradient-to-br from-blue-600 to-purple-600 shadow-lg"
                                : isMobileUnavailable
                                ? "bg-gray-700 cursor-not-allowed opacity-50"
                                : "bg-gray-800 hover:bg-gray-700"
                            }`}
                            disabled={isMobileUnavailable}
                          >
                            <div
                              className="w-full h-12 md:h-16 bg-gray-700 mb-1 flex items-center justify-center bg-cover bg-center rounded"
                              style={{
                                backgroundImage: `url(${template.image})`,
                              }}
                            />
                            <span className="text-xs md:text-sm">
                              {template.name}
                            </span>
                            <span className="text-xs text-gray-400">
                              {template.photoCount} photos
                              {isMobileUnavailable && " (Desktop only)"}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-gray-400 text-xs md:text-sm">
                      No templates available for {images.length} photos.
                    </p>
                  )}

                  {/* Date & Time Configuration */}
                  <div className="bg-gray-800 p-3 md:p-4 rounded-lg mt-3 md:mt-4">
                    <div className="flex justify-between items-center mb-2">
                      <h2 className="text-base md:text-lg font-semibold flex items-center gap-2">
                        Date & Time
                      </h2>
                      <button
                        onClick={() =>
                          setDateTimeConfig((prev) => ({
                            ...prev,
                            show: !prev.show,
                          }))
                        }
                        className="px-2 py-1 text-xs md:text-sm bg-blue-600 rounded-lg hover:bg-blue-700"
                      >
                        {dateTimeConfig.show ? "Hide" : "Show"}
                      </button>
                    </div>

                    {dateTimeConfig.show && (
                      <div className="space-y-2 md:space-y-3">
                        <div className="flex items-center gap-2">
                          <span className="text-xs md:text-sm">
                            Background:
                          </span>
                          <input
                            type="color"
                            value={dateTimeConfig.backgroundColor}
                            onChange={(e) =>
                              setDateTimeConfig((prev) => ({
                                ...prev,
                                backgroundColor: e.target.value,
                              }))
                            }
                            className="h-5 w-5 md:h-6 md:w-6 cursor-pointer"
                          />
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-xs md:text-sm">
                            Text Color:
                          </span>
                          <input
                            type="color"
                            value={dateTimeConfig.textColor}
                            onChange={(e) =>
                              setDateTimeConfig((prev) => ({
                                ...prev,
                                textColor: e.target.value,
                              }))
                            }
                            className="h-5 w-5 md:h-6 md:w-6 cursor-pointer"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs md:text-sm">
                            Date Font Size: {dateTimeConfig.dateFontSize}px
                          </label>
                          <input
                            type="range"
                            min="8"
                            max="24"
                            value={dateTimeConfig.dateFontSize}
                            onChange={(e) =>
                              setDateTimeConfig((prev) => ({
                                ...prev,
                                dateFontSize: parseInt(e.target.value),
                              }))
                            }
                            className="w-full cursor-pointer accent-blue-500"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs md:text-sm">
                            Time Font Size: {dateTimeConfig.timeFontSize}px
                          </label>
                          <input
                            type="range"
                            min="8"
                            max="32"
                            value={dateTimeConfig.timeFontSize}
                            onChange={(e) =>
                              setDateTimeConfig((prev) => ({
                                ...prev,
                                timeFontSize: parseInt(e.target.value),
                              }))
                            }
                            className="w-full cursor-pointer accent-blue-500"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs md:text-sm">
                            Width: {dateTimeConfig.width}px
                          </label>
                          <input
                            type="range"
                            min="120"
                            max="300"
                            value={dateTimeConfig.width}
                            onChange={(e) =>
                              setDateTimeConfig((prev) => ({
                                ...prev,
                                width: parseInt(e.target.value),
                              }))
                            }
                            className="w-full cursor-pointer accent-blue-500"
                          />
                        </div>

                        <p className="text-xs text-gray-400">
                          Drag to reposition date/time display
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Template assets selection */}
                  {selectedTemplate?.assets && (
                    <div className="mt-3 md:mt-4">
                      <button
                        onClick={() =>
                          setShowTemplateAssets(!showTemplateAssets)
                        }
                        className="w-full p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-between"
                      >
                        <span>Template Assets</span>
                        <span
                          className={`transform transition-transform ${
                            showTemplateAssets ? "rotate-180" : ""
                          }`}
                        >
                          ▼
                        </span>
                      </button>
                      {showTemplateAssets && (
                        <div className="mt-2 grid grid-cols-3 gap-2">
                          {selectedTemplate.assets.map((asset) => (
                            <button
                              key={asset.id}
                              onClick={() => toggleTemplateAsset(asset.id)}
                              className={`p-1 rounded-lg flex flex-col items-center ${
                                activeTemplateAssets.some(
                                  (a) => a.id === asset.id
                                )
                                  ? "bg-blue-600"
                                  : "bg-gray-800 hover:bg-gray-700"
                              }`}
                            >
                              <div
                                className="w-full h-10 md:h-12 bg-cover bg-center bg-no-repeat"
                                style={{
                                  backgroundImage: `url(${asset.preview})`,
                                  backgroundSize: "contain",
                                }}
                              />
                              <span className="text-xs mt-1">{asset.id}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Template text inputs */}
                  {templateTexts.length > 0 && (
                    <div className="mt-3 md:mt-4 space-y-2 md:space-y-3">
                      <h3 className="font-semibold text-base md:text-lg">
                        Template Text
                      </h3>
                      {templateTexts.map((textOpt, index) => (
                        <div key={index} className="space-y-2">
                          <input
                            type="text"
                            value={textOpt.text}
                            onChange={(e) =>
                              updateTemplateText(index, e.target.value)
                            }
                            className="w-full p-2 text-xs md:text-base bg-gray-800 rounded-lg"
                          />
                          <div className="flex items-center gap-2">
                            <input
                              type="color"
                              value={textOpt.color}
                              onChange={(e) => {
                                const newTemplateTexts = [...templateTexts];
                                newTemplateTexts[index].color = e.target.value;
                                setTemplateTexts(newTemplateTexts);
                                saveHistory();
                              }}
                              className="h-5 w-5 md:h-6 md:w-6 cursor-pointer"
                            />
                            <input
                              type="range"
                              min="10"
                              max="40"
                              value={textOpt.fontSize}
                              onChange={(e) =>
                                updateTemplateTextSize(
                                  index,
                                  parseInt(e.target.value)
                                )
                              }
                              className="flex-1 cursor-pointer accent-blue-500"
                            />
                            <span className="text-xs w-8 text-right">
                              {textOpt.fontSize}px
                            </span>
                          </div>
                          <p className="text-xs text-gray-400">
                            Drag to reposition text
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Custom text in template mode */}
                  <div className="mt-3 md:mt-4 bg-gray-800 p-3 md:p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-semibold text-base md:text-lg flex items-center gap-2">
                        <Type size={16} /> Additional Text
                      </h3>
                      <button
                        onClick={addCustomText}
                        className="px-2 py-1 text-xs md:text-sm bg-blue-600 rounded-lg hover:bg-blue-700"
                      >
                        Add Text
                      </button>
                    </div>
                    {customTexts.map((text) => (
                      <div
                        key={text.id}
                        className="mb-2 md:mb-3 p-2 bg-gray-700 rounded-lg relative"
                      >
                        <div className="flex justify-between items-center mb-1">
                          <input
                            type="text"
                            value={text.text}
                            onChange={(e) =>
                              updateCustomText(text.id, "text", e.target.value)
                            }
                            className="w-full p-1 text-xs md:text-base bg-gray-800 rounded"
                          />
                          <button
                            onClick={() => removeCustomText(text.id)}
                            className="ml-2 p-1 text-red-400 hover:text-red-300"
                          >
                            <X size={14} />
                          </button>
                        </div>
                        <div className="flex items-center gap-2">
                          <input
                            type="color"
                            value={text.color}
                            onChange={(e) =>
                              updateCustomText(text.id, "color", e.target.value)
                            }
                            className="h-5 w-5 md:h-6 md:w-6 cursor-pointer"
                          />
                          <input
                            type="range"
                            min="10"
                            max="40"
                            value={text.fontSize}
                            onChange={(e) =>
                              updateCustomText(
                                text.id,
                                "fontSize",
                                parseInt(e.target.value)
                              )
                            }
                            className="flex-1 cursor-pointer accent-blue-500"
                          />
                          <span className="text-xs w-8 text-right">
                            {text.fontSize}px
                          </span>
                        </div>
                        <p className="text-xs text-gray-400 mt-1">
                          Drag to reposition text
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  {/* Layout Selection */}
                  <div>
                    <h2 className="text-base md:text-lg font-semibold mb-2">
                      Layout
                    </h2>
                    <div className="flex gap-2 flex-wrap">
                      <button
                        onClick={() => {
                          setLayout("vertical");
                          saveHistory();
                        }}
                        className={`px-3 py-1 md:px-4 md:py-2 rounded-lg transition-all ${
                          layout === "vertical"
                            ? "bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg"
                            : "bg-gray-800 hover:bg-gray-700"
                        }`}
                      >
                        Vertical
                      </button>
                      <button
                        onClick={() => {
                          setLayout("horizontal");
                          saveHistory();
                        }}
                        className={`px-3 py-1 md:px-4 md:py-2 rounded-lg transition-all ${
                          layout === "horizontal"
                            ? "bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg"
                            : "bg-gray-800 hover:bg-gray-700"
                        }`}
                        disabled={images.length !== 2 && images.length !== 4}
                      >
                        Horizontal{" "}
                        {images.length !== 2 &&
                          images.length !== 4 &&
                          "(2 or 4 photos only)"}
                      </button>
                    </div>
                  </div>

                  {/* Frame Color */}
                  <div>
                    <h2 className="text-base md:text-lg font-semibold mb-2">
                      Frame Color
                    </h2>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={frameColor}
                        onChange={(e) => {
                          setFrameColor(e.target.value);
                          saveHistory();
                        }}
                        className="w-10 h-10 md:w-12 md:h-12 cursor-pointer rounded-lg border-2 border-gray-700"
                      />
                      <span className="text-xs md:text-sm bg-gray-800 px-2 md:px-3 py-1 rounded-lg">
                        {frameColor}
                      </span>
                    </div>
                  </div>

                  {/* Frame Width */}
                  <div>
                    <h2 className="text-base md:text-lg font-semibold mb-2">
                      Frame Width
                    </h2>
                    <div className="bg-gray-800 p-2 md:p-3 rounded-lg">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={frameWidth}
                        onChange={(e) => {
                          setFrameWidth(parseInt(e.target.value));
                          saveHistory();
                        }}
                        className="w-full cursor-pointer accent-blue-500"
                      />
                      <div className="flex justify-between text-xs text-gray-400 mt-1">
                        <span>Thin</span>
                        <span>{frameWidth}px</span>
                        <span>Thick</span>
                      </div>
                    </div>
                  </div>

                  {/* Date & Time Configuration */}
                  <div className="bg-gray-800 p-3 md:p-4 rounded-lg mt-3 md:mt-4">
                    <div className="flex justify-between items-center mb-2">
                      <h2 className="text-base md:text-lg font-semibold flex items-center gap-2">
                        Date & Time
                      </h2>
                      <button
                        onClick={() =>
                          setDateTimeConfig((prev) => ({
                            ...prev,
                            show: !prev.show,
                          }))
                        }
                        className="px-2 py-1 text-xs md:text-sm bg-blue-600 rounded-lg hover:bg-blue-700"
                      >
                        {dateTimeConfig.show ? "Hide" : "Show"}
                      </button>
                    </div>

                    {dateTimeConfig.show && (
                      <div className="space-y-2 md:space-y-3">
                        <div className="flex items-center gap-2">
                          <span className="text-xs md:text-sm">
                            Background:
                          </span>
                          <input
                            type="color"
                            value={dateTimeConfig.backgroundColor}
                            onChange={(e) =>
                              setDateTimeConfig((prev) => ({
                                ...prev,
                                backgroundColor: e.target.value,
                              }))
                            }
                            className="h-5 w-5 md:h-6 md:w-6 cursor-pointer"
                          />
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-xs md:text-sm">
                            Text Color:
                          </span>
                          <input
                            type="color"
                            value={dateTimeConfig.textColor}
                            onChange={(e) =>
                              setDateTimeConfig((prev) => ({
                                ...prev,
                                textColor: e.target.value,
                              }))
                            }
                            className="h-5 w-5 md:h-6 md:w-6 cursor-pointer"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs md:text-sm">
                            Date Font Size: {dateTimeConfig.dateFontSize}px
                          </label>
                          <input
                            type="range"
                            min="8"
                            max="24"
                            value={dateTimeConfig.dateFontSize}
                            onChange={(e) =>
                              setDateTimeConfig((prev) => ({
                                ...prev,
                                dateFontSize: parseInt(e.target.value),
                              }))
                            }
                            className="w-full cursor-pointer accent-blue-500"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs md:text-sm">
                            Time Font Size: {dateTimeConfig.timeFontSize}px
                          </label>
                          <input
                            type="range"
                            min="8"
                            max="32"
                            value={dateTimeConfig.timeFontSize}
                            onChange={(e) =>
                              setDateTimeConfig((prev) => ({
                                ...prev,
                                timeFontSize: parseInt(e.target.value),
                              }))
                            }
                            className="w-full cursor-pointer accent-blue-500"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs md:text-sm">
                            Width: {dateTimeConfig.width}px
                          </label>
                          <input
                            type="range"
                            min="120"
                            max="300"
                            value={dateTimeConfig.width}
                            onChange={(e) =>
                              setDateTimeConfig((prev) => ({
                                ...prev,
                                width: parseInt(e.target.value),
                              }))
                            }
                            className="w-full cursor-pointer accent-blue-500"
                          />
                        </div>

                        <p className="text-xs text-gray-400">
                          Drag to reposition date/time display
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Custom Text */}
                  <div className="bg-gray-800 p-3 md:p-4 rounded-lg">
                    <h2 className="text-base md:text-lg font-semibold mb-2 flex items-center gap-2">
                      <Type size={16} /> Custom Text
                    </h2>
                    <input
                      type="text"
                      value={customText}
                      onChange={(e) => {
                        setCustomText(e.target.value);
                        saveHistory();
                      }}
                      className="w-full p-2 text-xs md:text-base bg-gray-700 rounded-lg mb-2"
                      placeholder="Enter your text here"
                    />
                    <div className="flex items-center gap-3 md:gap-4">
                      <div className="flex items-center gap-2">
                        <span className="text-xs md:text-sm">Color:</span>
                        <input
                          type="color"
                          value={textColor}
                          onChange={(e) => {
                            setTextColor(e.target.value);
                            saveHistory();
                          }}
                          className="h-5 w-5 md:h-6 md:w-6 cursor-pointer"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs md:text-sm">Size:</span>
                          <input
                            type="range"
                            min="10"
                            max="40"
                            value={textFontSize}
                            onChange={(e) => {
                              setTextFontSize(parseInt(e.target.value));
                              saveHistory();
                            }}
                            className="flex-1 cursor-pointer accent-blue-500"
                          />
                          <span className="text-xs w-8 text-right">
                            {textFontSize}px
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">
                      Drag to reposition text
                    </p>
                  </div>

                  {/* Additional Custom Text */}
                  <div className="bg-gray-800 p-3 md:p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h2 className="text-base md:text-lg font-semibold flex items-center gap-2">
                        <Type size={16} /> Additional Text
                      </h2>
                      <button
                        onClick={addCustomText}
                        className="px-2 py-1 text-xs md:text-sm bg-blue-600 rounded-lg hover:bg-blue-700"
                      >
                        Add Text
                      </button>
                    </div>
                    {customTexts.map((text) => (
                      <div
                        key={text.id}
                        className="mb-2 md:mb-3 p-2 bg-gray-700 rounded-lg relative"
                      >
                        <div className="flex justify-between items-center mb-1">
                          <input
                            type="text"
                            value={text.text}
                            onChange={(e) =>
                              updateCustomText(text.id, "text", e.target.value)
                            }
                            className="w-full p-1 text-xs md:text-base bg-gray-800 rounded"
                          />
                          <button
                            onClick={() => removeCustomText(text.id)}
                            className="ml-2 p-1 text-red-400 hover:text-red-300"
                          >
                            <X size={14} />
                          </button>
                        </div>
                        <div className="flex items-center gap-2">
                          <input
                            type="color"
                            value={text.color}
                            onChange={(e) =>
                              updateCustomText(text.id, "color", e.target.value)
                            }
                            className="h-5 w-5 md:h-6 md:w-6 cursor-pointer"
                          />
                          <input
                            type="range"
                            min="10"
                            max="40"
                            value={text.fontSize}
                            onChange={(e) =>
                              updateCustomText(
                                text.id,
                                "fontSize",
                                parseInt(e.target.value)
                              )
                            }
                            className="flex-1 cursor-pointer accent-blue-500"
                          />
                          <span className="text-xs w-8 text-right">
                            {text.fontSize}px
                          </span>
                        </div>
                        <p className="text-xs text-gray-400 mt-1">
                          Drag to reposition text
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Background Image */}
                  <div className="bg-gray-800 p-3 md:p-4 rounded-lg">
                    <h2 className="text-base md:text-lg font-semibold mb-2 flex items-center gap-2">
                      <ImageIcon size={16} /> Background Image
                    </h2>
                    <label className="flex items-center gap-2 p-2 text-xs md:text-base bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-600 transition-colors">
                      <Upload size={16} />
                      <span>Upload Background</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleBackgroundUpload}
                        className="hidden"
                      />
                    </label>
                    {backgroundImage && (
                      <button
                        onClick={() => {
                          setBackgroundImage(null);
                          saveHistory();
                        }}
                        className="mt-2 w-full py-1 text-xs md:text-sm text-red-400 hover:text-red-300 bg-gray-700 rounded-lg"
                      >
                        Remove Background
                      </button>
                    )}
                  </div>

                  {/* Stickers */}
                  <div className="bg-gray-800 p-3 md:p-4 rounded-lg">
                    <h2 className="text-base md:text-lg font-semibold mb-2 flex items-center gap-2">
                      <Smile size={16} /> Stickers
                    </h2>
                    <button
                      onClick={() => setShowStickers(!showStickers)}
                      className="w-full p-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors flex items-center justify-between"
                    >
                      <span>
                        {showStickers ? "Hide Stickers" : "Show Stickers"}
                      </span>
                      <span
                        className={`transform transition-transform ${
                          showStickers ? "rotate-180" : ""
                        }`}
                      >
                        ▼
                      </span>
                    </button>
                    {showStickers && (
                      <div className="mt-2 md:mt-3">
                        <div className="grid grid-cols-4 gap-2">
                          {stickerOptions.map((sticker, index) => (
                            <button
                              key={index}
                              onClick={() => addSticker(sticker)}
                              className="p-2 text-xl md:text-2xl bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors flex items-center justify-center h-10 md:h-12"
                            >
                              {sticker.emoji}
                            </button>
                          ))}
                        </div>
                        {stickers.length > 0 && (
                          <div className="mt-2">
                            <p className="text-xs text-gray-400">
                              Click on a sticker to remove it | Drag to move
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Undo/Redo */}
                  <div className="flex gap-2">
                    <button
                      onClick={undo}
                      disabled={historyIndex <= 0}
                      className={`flex-1 p-2 text-xs md:text-base rounded-lg flex items-center justify-center gap-2 transition-all ${
                        historyIndex <= 0
                          ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                          : "bg-gray-800 hover:bg-gray-700"
                      }`}
                    >
                      <RotateCcw size={14} /> Undo
                    </button>
                    <button
                      onClick={redo}
                      disabled={historyIndex >= history.length - 1}
                      className={`flex-1 p-2 text-xs md:text-base rounded-lg flex items-center justify-center gap-2 transition-all ${
                        historyIndex >= history.length - 1
                          ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                          : "bg-gray-800 hover:bg-gray-700"
                      }`}
                    >
                      <RotateCw size={14} /> Redo
                    </button>
                  </div>
                </>
              )}

              <div className="flex gap-3 md:gap-4 pt-3 md:pt-4">
                <button
                  onClick={() => navigate(-1)}
                  className="flex items-center gap-2 px-3 py-1 md:px-4 md:py-2 text-xs md:text-base bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <ChevronLeft size={16} /> Back
                </button>
                <div className="flex-1 flex gap-2">
                  <button
                    onClick={downloadStrip}
                    disabled={
                      (mode === "template" && !selectedTemplate) ||
                      (mode === "custom" &&
                        layout === "horizontal" &&
                        images.length !== 2 &&
                        images.length !== 4)
                    }
                    className={`flex-1 flex items-center gap-2 px-3 py-1 md:px-4 md:py-2 text-xs md:text-base rounded-lg justify-center transition-colors ${
                      (mode === "template" && !selectedTemplate) ||
                      (mode === "custom" &&
                        layout === "horizontal" &&
                        images.length !== 2 &&
                        images.length !== 4)
                        ? "bg-gray-700 cursor-not-allowed"
                        : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg"
                    }`}
                  >
                    <Download size={16} /> Download
                  </button>
                  <button
                    onClick={() => setShowShareOptions(!showShareOptions)}
                    className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    <Share2 size={16} />
                  </button>
                </div>
              </div>

              {/* Share Options */}
              {showShareOptions && (
                <div className="flex gap-2 mt-2 animate-fadeIn">
                  <button
                    onClick={shareToInstagram}
                    className="flex-1 flex items-center justify-center gap-2 p-2 text-xs md:text-base bg-gradient-to-r from-pink-500 to-yellow-500 rounded-lg hover:from-pink-600 hover:to-yellow-600 transition-colors"
                  >
                    <Instagram size={16} /> Instagram
                  </button>
                  <button
                    onClick={shareToWhatsApp}
                    className="flex-1 flex items-center justify-center gap-2 p-2 text-xs md:text-base bg-gradient-to-r from-green-500 to-green-600 rounded-lg hover:from-green-600 hover:to-green-700 transition-colors"
                  >
                    <MessageSquare size={16} /> WhatsApp
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Preview */}
          <div
            className="flex-1 bg-gray-900 p-4 md:p-6 rounded-xl flex justify-center items-center"
            style={getAnimationStyle("preview")}
          >
            <div className="bg-white p-2 md:p-4 rounded-lg shadow-2xl transform transition-transform hover:scale-105 max-w-full overflow-auto">
              {images.length > 0 ? (
                <Stage
                  width={
                    mode === "template" && selectedTemplate
                      ? isMobileView
                        ? Math.min(selectedTemplate.dimensions.width, 400)
                        : selectedTemplate.dimensions.width
                      : layout === "vertical"
                      ? 400
                      : isMobileView
                      ? 400
                      : 800
                  }
                  height={
                    mode === "template" && selectedTemplate
                      ? isMobileView
                        ? (selectedTemplate.dimensions.height /
                            selectedTemplate.dimensions.width) *
                          Math.min(selectedTemplate.dimensions.width, 400)
                        : selectedTemplate.dimensions.height
                      : layout === "vertical"
                      ? 800
                      : 400
                  }
                  ref={stageRef}
                  scaleX={
                    mode === "template" && selectedTemplate && isMobileView
                      ? Math.min(1, 400 / selectedTemplate.dimensions.width)
                      : 1
                  }
                  scaleY={
                    mode === "template" && selectedTemplate && isMobileView
                      ? Math.min(1, 400 / selectedTemplate.dimensions.width)
                      : 1
                  }
                >
                  <Layer>
                    {mode === "template"
                      ? renderTemplateStrip()
                      : renderCustomStrip()}
                  </Layer>
                </Stage>
              ) : (
                <div className="w-full h-64 flex items-center justify-center text-gray-500">
                  No images to display
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
