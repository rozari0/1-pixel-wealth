var musk = document.getElementById('musk');
var musk_counter = document.getElementById('musk-counter');
var muskCounterStart = document.getElementById('musk-counter-start');

var four_hundred = document.getElementById('four-hundred');
var four_hundred_counter = document.getElementById('four-hundred-counter');
var four_hundred_counter_start = document.getElementById('four-hundred-counter-start');

var sixtyPercent = document.getElementById('sixty-percent');
var sixtyPercentIndicator = document.getElementById('sixty-percent-indicator');
var sixtyPercentScrollPercentage = 0.0;
var babies = document.getElementById('babies-wrapper');
var baby_counter = document.getElementById('baby-counter');

var thousand = new Intl.NumberFormat('en-US')
var money = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});
var additional_instructions_shown = false;

function detect_confused_user(e, timer) {
  if (!additional_instructions_shown) {
    additional_instructions_shown = true;

    setTimeout(function(){
      if (window.scrollX < 1) {
        document.getElementById('instructions').classList.add("show");
      }
    }, timer);
  }
}
function detect_slightly_confused_user(e, timer) {
  detect_confused_user(e, 2000);
}
function detect_very_confused_user(e, timer) {
  detect_confused_user(e, 4500);
}

if (window.innerWidth > 450) {
  document.addEventListener("mousemove", detect_very_confused_user, {once: true});
  document.addEventListener("mousewheel", detect_slightly_confused_user, {once: true});
  document.addEventListener("DOMMouseScroll", detect_slightly_confused_user, {once: true});
}

window.addEventListener('scroll', function(){
  update_wealth_counter();
});

function generate_sixty_percent() {
  for (var i = 0; i < 100; i++) {
    var node = document.createElement("div");
    node.classList = "people";
    if (i === 0) {
      node.classList += " first";
    }
    document.getElementById("sixty-percent").appendChild(node);
  }
}
generate_sixty_percent();

sixtyPercent.addEventListener('scroll', function(){
  let newScroll = ((sixtyPercent.scrollTop / sixtyPercent.scrollHeight) * 60).toFixed(1);
  if (sixtyPercentScrollPercentage !== newScroll) {
    sixtyPercentScrollPercentage = newScroll;
    sixtyPercentIndicator.innerHTML = newScroll + '%';
  }
})
babies.addEventListener('scroll', function(){
  let is_mobile = window.innerWidth <= 450;
  let bg_size = (is_mobile) ? 68 : 160;
  baby_counter.innerHTML = thousand.format(Math.floor(babies.scrollTop / bg_size * 5));
})

function update_wealth_counter() {
  if (musk_viewable()) {
    if (musk_counter_viewable()) {
      let wealth = (window.scrollX - musk.offsetLeft + 175) * 500000;
      musk_counter.innerHTML = (wealth < 240700000000) ? money.format(wealth) : "$240,700,000,000";
    }
    else {
      musk_counter.innerHTML = '';
    }
  }
  else if (four_hundred_viewable()) {
    if (four_hundred_counter_viewable()) {
      let wealth = (window.scrollX - four_hundred.offsetLeft + 175) * 500000;
      four_hundred_counter.innerHTML = (wealth < 3200000000000) ? money.format(wealth) : "$3,200,000,000,000";
    }
    else {
      four_hundred_counter.innerHTML = '';
    }
  }
  function musk_viewable() {
    return window.scrollX < musk.offsetLeft + musk.offsetWidth + 100;
  }
  function musk_counter_viewable() {
    return muskCounterStart.offsetLeft - window.scrollX < (window.innerWidth);
  }
  function four_hundred_viewable() {
    return window.scrollX < four_hundred.offsetLeft + four_hundred.offsetWidth + 100;
  }
  function four_hundred_counter_viewable() {
    return four_hundred_counter_start.offsetLeft - window.scrollX < (window.innerWidth);
  }
}
function toggleZoom() {
  document.getElementById('line-chart').classList.toggle('zoom');
}


