const Keyboard = {
    elements: {
      main: null,
      keysContainer: null,
      keys: []
    },
  
    eventHandlers: {
      oninput: null,
      onclose: null
    },
  
    properties: {
      value: "",
      capsLock: false,
      shift: false,
      language: true
    },
  
    init() {
      // Create main elements
      this.elements.main = document.createElement("div");
      this.elements.keysContainer = document.createElement("div");
  
      // Setup main elements (установить)
      this.elements.main.classList.add("keyboard", "keyboard--hidden");
      this.elements.keysContainer.classList.add("keyboard__keys");
      this.elements.keysContainer.appendChild(this._createKeys());  
      this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");
  
      // Add to DOM
      this.elements.main.appendChild(this.elements.keysContainer);
      document.body.appendChild(this.elements.main);
  
      // Automatically use keyboard for elements with .use-keyboard-input
      document.querySelectorAll(".use-keyboard-input").forEach(element => {
        element.addEventListener("focus", () => {
          this.open(element.value, currentValue => {
            element.value = currentValue;
          });
        });
      });
    },

    getKeys() {
        const keyLayoutEn = [
            "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace",
            "q", "w", "e", "r", "t", "y", "u", "i", "o", "p",
            "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", "enter",
            "shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "?", "en",
            "done", "space"
      ];

      const keyLayoutRu = [
        "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace",
        "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ",
        "caps", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", "enter",
        "shift", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ".", "ру",  
        "done", "space"   
      ];

      return this.properties.language ? keyLayoutEn : keyLayoutRu;
    },
  
    _createKeys() {
      const fragment = document.createDocumentFragment();

      const keys = this.getKeys();     
  
      // Creates HTML for an icon
      const createIconHTML = (icon_name) => {
        return `<i class="material-icons">${icon_name}</i>`;
      };
  
      keys.forEach(key => {
        const keyElement = document.createElement("button");
        const insertLineBreak = ["backspace", "p", "enter", "en", "ъ", "ру"].indexOf(key) !== -1;
  
        // Add attributes/classes
        keyElement.setAttribute("type", "button");
        keyElement.classList.add("keyboard__key");
  
        switch (key) {
            case "en":
                keyElement.classList.add("keyboard__key--wide");
                keyElement.innerHTML = createIconHTML("EN");
                
                keyElement.addEventListener("click", () => {
                    this._toggleLanguage();
                });
                break;
            
            case "ру":
                keyElement.classList.add("keyboard__key--wide");
                keyElement.innerHTML = createIconHTML("ру");
                
                keyElement.addEventListener("click", () => {
                    this._toggleLanguage();
                });
                break;

            case "shift": 
                keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
                keyElement.innerHTML = createIconHTML("file_upload");

                keyElement.addEventListener("click", () => {
                    this._toggleShift();
                    keyElement.classList.toggle('keyboard__key--active', this.properties.shift);
                });
                break;

            case "backspace":
                keyElement.classList.add("keyboard__key--wide");
                keyElement.innerHTML = createIconHTML("backspace");
    
                keyElement.addEventListener("click", () => {
                this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
                this._triggerEvent("oninput");
                });
  
                break;
  
            case "caps":
                keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
                keyElement.innerHTML = createIconHTML("keyboard_capslock");
    
                keyElement.addEventListener("click", () => {
                this._toggleCapsLock();
                keyElement.classList.toggle("keyboard__key--active", this.properties.capsLock);
                });
  
                break;
  
            case "enter":
                keyElement.classList.add("keyboard__key--wide");
                keyElement.innerHTML = createIconHTML("keyboard_return");
    
                keyElement.addEventListener("click", () => {
                this.properties.value += "\n";
                this._triggerEvent("oninput");
                });
  
                break;
  
            case "space":
                keyElement.classList.add("keyboard__key--extra-wide");
                keyElement.innerHTML = createIconHTML("space_bar");
    
                keyElement.addEventListener("click", () => {
                this.properties.value += " ";
                this._triggerEvent("oninput");
                });
    
                break;
  
            case "done":
                keyElement.classList.add("keyboard__key--wide", "keyboard__key--dark");
                keyElement.innerHTML = createIconHTML("check_circle");
    
                keyElement.addEventListener("click", () => {
                this.close();
                this._triggerEvent("onclose");
                });
    
                break;
  
            default:
                keyElement.textContent = key.toLowerCase();
    
                keyElement.addEventListener("click", () => {
                    if (this.properties.shift === false) {
                        this.properties.value += this.properties.capsLock ? key.toUpperCase() : key.toLowerCase();
                    } else {
                        switch (key) {
                            case "1": 
                            this.properties.value += this.properties.language ? "!" : "!";
                            break;
                            case "2": 
                            this.properties.value += this.properties.language ? "@" : "@";
                            break;
                            case "3": 
                            this.properties.value += this.properties.language ? "№" : "#";
                            break;
                            case "4": 
                            this.properties.value += this.properties.language ? ";" : "$";
                            break;
                            case "5": 
                            this.properties.value += this.properties.language ? "%" : "%";
                            break;
                            case "6": 
                            this.properties.value += this.properties.language ? ":" : "^";
                            break;
                            case "7": 
                            this.properties.value += this.properties.language ? "?" : "&";
                            break;
                            case "8": 
                            this.properties.value += this.properties.language ? "*" : "*";
                            break;
                            case "9": 
                            this.properties.value += this.properties.language ? "(" : "(";
                            break;
                            case "0": 
                            this.properties.value += this.properties.language ? ")" : ")";
                            break;
                            case ",": 
                            this.properties.value += "<";
                            break;
                            case ".": 
                            this.properties.value += ">";
                            break;
                            case "?": 
                            this.properties.value += "/";
                            break;
                            default: 
                            this.properties.value += !this.properties.capsLock ? key.toUpperCase() : key.toLowerCase();
                            break;
                        }
                    }
                    
                    this._triggerEvent("oninput");
                });    
                break;
                
        }
  
        fragment.appendChild(keyElement);
  
        if (insertLineBreak) {
          fragment.appendChild(document.createElement("br"));
        }
      });
  
      return fragment;
    },
  
    _triggerEvent(handlerName) {
      if (typeof this.eventHandlers[handlerName] == "function") {
        this.eventHandlers[handlerName](this.properties.value);
      }
    },
  
    _toggleCapsLock() {
      this.properties.capsLock = !this.properties.capsLock;
  
      for (const key of this.elements.keys) {
        if (key.childElementCount === 0) {
          key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
        }
      }
    },

    _toggleLanguage() {
        this.properties.language = !this.properties.language;
        this.elements.keysContainer.innerHTML = '';
        this.elements.keysContainer.appendChild(this._createKeys());
        this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");
    },

    _toggleShift() {
        this.properties.shift = !this.properties.shift;
        
        if (this.properties.capsLock === false){
            for (const key of this.elements.keys) {           
                if (key.childElementCount === 0) {
                    if ((key.textContent === "1") || (key.textContent === "!")) key.textContent = this.properties.shift ? !this.properties.language ? "!" : "!" : "1"; 
                    if ((key.textContent === "2") || (key.textContent === "@")) key.textContent = this.properties.shift ? !this.properties.language ? "@" : "@" : "2";
                    if ((key.textContent === "3") || (key.textContent === "#") || (key.textContent === "№")) key.textContent = this.properties.shift ? !this.properties.language ? "№" : "#" : "3";
                    if ((key.textContent === "4") || (key.textContent === "$") || (key.textContent === ";")) key.textContent = this.properties.shift ? !this.properties.language ? ";" : "$" : "4";
                    if ((key.textContent === "5") || (key.textContent === "%")) key.textContent = this.properties.shift ? !this.properties.language ? "%" : "%" : "5";
                    if ((key.textContent === "6") || (key.textContent === "^") || (key.textContent === ":")) key.textContent = this.properties.shift ? !this.properties.language ? ":" : "^" : "6";
                    if ((key.textContent === "7") || (key.textContent === "&") || (key.textContent === "`")) key.textContent = this.properties.shift ? !this.properties.language ? "`" : "&" : "7";
                    if ((key.textContent === "8") || (key.textContent === "*")) key.textContent = this.properties.shift ? !this.properties.language ? "*" : "*" : "8";
                    if ((key.textContent === "9") || (key.textContent === "(")) key.textContent = this.properties.shift ? !this.properties.language ? "(" : "(" : "9";
                    if ((key.textContent === "0") || (key.textContent === ")")) key.textContent = this.properties.shift ? !this.properties.language ? ")" : ")" : "0";
                    if ((key.textContent === ",") || (key.textContent === "<")) key.textContent = this.properties.shift ? "<" : ",";
                    if ((key.textContent === ".") || (key.textContent === ">")) key.textContent = this.properties.shift ? ">" : ".";
                    if ((key.textContent === "?") || (key.textContent === "/")) key.textContent = this.properties.shift ? "/" : "?";
                    key.textContent = this.properties.shift ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
                }
            }
        }
        else {
            for (const key of this.elements.keys) {           
                if (key.childElementCount === 0) {
                    if ((key.textContent === "1") || (key.textContent === "!")) key.textContent = this.properties.shift ? !this.properties.language ? "!" : "!" : "1"; 
                    if ((key.textContent === "2") || (key.textContent === "@")) key.textContent = this.properties.shift ? !this.properties.language ? "@" : "@" : "2";
                    if ((key.textContent === "3") || (key.textContent === "#") || (key.textContent === "№")) key.textContent = this.properties.shift ? !this.properties.language ? "№" : "#" : "3";
                    if ((key.textContent === "4") || (key.textContent === "$") || (key.textContent === ";")) key.textContent = this.properties.shift ? !this.properties.language ? ";" : "$" : "4";
                    if ((key.textContent === "5") || (key.textContent === "%")) key.textContent = this.properties.shift ? !this.properties.language ? "%" : "%" : "5";
                    if ((key.textContent === "6") || (key.textContent === "^") || (key.textContent === ":")) key.textContent = this.properties.shift ? !this.properties.language ? ":" : "^" : "6";
                    if ((key.textContent === "7") || (key.textContent === "&") || (key.textContent === "`")) key.textContent = this.properties.shift ? !this.properties.language ? "`" : "&" : "7";
                    if ((key.textContent === "8") || (key.textContent === "*")) key.textContent = this.properties.shift ? !this.properties.language ? "*" : "*" : "8";
                    if ((key.textContent === "9") || (key.textContent === "(")) key.textContent = this.properties.shift ? !this.properties.language ? "(" : "(" : "9";
                    if ((key.textContent === "0") || (key.textContent === ")")) key.textContent = this.properties.shift ? !this.properties.language ? ")" : ")" : "0";
                    if ((key.textContent === ",") || (key.textContent === "<")) key.textContent = this.properties.shift ? "<" : ",";
                    if ((key.textContent === ".") || (key.textContent === ">")) key.textContent = this.properties.shift ? ">" : ".";
                    if ((key.textContent === "?") || (key.textContent === "/")) key.textContent = this.properties.shift ? "/" : "?";
                    key.textContent = this.properties.shift ? key.textContent.toLowerCase() : key.textContent.toUpperCase();
                }
            }
        }
    },
  
    open(initialValue, oninput, onclose) {
      this.properties.value = initialValue || "";
      this.eventHandlers.oninput = oninput;
      this.eventHandlers.onclose = onclose;
      this.elements.main.classList.remove("keyboard--hidden");
    },
  
    close() {
      this.properties.value = "";
      this.eventHandlers.oninput = oninput;
      this.eventHandlers.onclose = onclose;
      this.elements.main.classList.add("keyboard--hidden");
    }
  };
  
  window.addEventListener("DOMContentLoaded", function () {
    Keyboard.init();
  });