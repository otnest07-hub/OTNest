(function () {
  var root = document.getElementById("where-does-it-hurt");
  if (!root) return;
  var panel = root.querySelector(".bm-panel");
  var WA = "https://wa.me/917549377608?text=";

  var AREAS = {
    neck: {
      title: "Neck pain",
      causes: ["Long hours at a desk or on the phone", "A stiff neck after sleeping awkwardly", "Whiplash after a fall or accident", "Pain or tingling travelling into the arm"],
      help: "Gentle mobilisation to free things up, small changes to how you sit and sleep, and strengthening so it stops coming back.",
      link: ["/blog-posture-desk-work/", "Posture habits that protect your neck"],
      short: "neck pain"
    },
    shoulder: {
      title: "Shoulder pain",
      causes: ["Frozen shoulder &mdash; pain, then stiffness", "Rotator cuff strain from lifting or sport", "Pain reaching overhead or behind your back", "Weakness after a dislocation or fracture"],
      help: "We work out whether it&rsquo;s the joint, the tendons or your neck, then restore movement step by step without forcing a painful shoulder.",
      link: ["/frozen-shoulder-treatment/", "Frozen shoulder treatment"],
      short: "shoulder pain"
    },
    back: {
      title: "Lower back pain &amp; sciatica",
      causes: ["A disc problem or a strain after lifting", "Sciatica &mdash; pain or tingling down the leg", "Stiffness from long hours sitting", "Pain during or after pregnancy"],
      help: "Finding the movements that ease your pain, hands-on treatment and dry needling where it helps, and a simple plan so daily life stops aggravating it.",
      link: ["/sciatica-treatment/", "Back pain &amp; sciatica treatment"],
      short: "back pain"
    },
    hand: {
      title: "Elbow, wrist &amp; hand",
      causes: ["Tennis or golfer&rsquo;s elbow", "Carpal tunnel &mdash; numb or tingling fingers", "Stiffness after a fracture or cast", "Weak grip or trouble with fine tasks"],
      help: "Hand therapy is where physiotherapy and occupational therapy meet &mdash; we rebuild strength, fine movement and the everyday tasks you need your hands for.",
      link: ["/service/", "See all treatments"],
      short: "elbow / wrist / hand pain"
    },
    hip: {
      title: "Hip pain",
      causes: ["Hip arthritis and morning stiffness", "Recovery after a hip replacement", "Pain at the side of the hip when lying down", "Groin strain from sport"],
      help: "Strength and mobility work for the hip and core, walking and stairs practice, and home visits if travelling after surgery is hard.",
      link: ["/home-visit-physiotherapy/", "Rehab at home after surgery"],
      short: "hip pain"
    },
    knee: {
      title: "Knee pain",
      causes: ["Knee arthritis", "Ligament (ACL / MCL) or meniscus injuries", "Pain at the front of the knee on stairs", "Recovery after a knee replacement"],
      help: "We check the knee, hip and the way you walk, then strengthen the muscles that protect the joint &mdash; most knee pain improves without surgery.",
      link: ["/knee-pain-treatment/", "Knee pain treatment"],
      short: "knee pain"
    },
    ankle: {
      title: "Ankle &amp; foot",
      causes: ["A sprained or rolled ankle", "Heel pain first thing in the morning", "Achilles pain with walking or running", "Weak or unstable ankles after old injuries"],
      help: "Settling pain and swelling, then balance and strength work so the ankle doesn&rsquo;t give way again &mdash; plus taping for sport.",
      link: ["/blog-sports-injury-prevention/", "Preventing sports injuries"],
      short: "ankle / foot pain"
    },
    child: {
      title: "My child&rsquo;s development",
      causes: ["Handwriting, cutting or buttons are a struggle", "Strong reactions to noise, textures or touch", "Clumsiness or delayed milestones", "Autism, ADHD or developmental delay"],
      help: "Dr. Satish is an occupational therapist as well as a physiotherapist. Sessions are play-based and build the everyday skills your child needs.",
      link: ["/autism-adhd-occupational-therapy/", "Children&rsquo;s occupational therapy"],
      short: "occupational therapy for my child"
    },
    surgery: {
      title: "Recovering from surgery",
      causes: ["Knee or hip replacement", "Ligament reconstruction or keyhole surgery", "Spine surgery", "Fracture fixation"],
      help: "A guided plan from the first weeks to full function &mdash; at the clinic, or at home if getting out is still hard.",
      link: ["/blog-post-surgery-recovery/", "What to expect after surgery"],
      short: "rehab after surgery"
    },
    stroke: {
      title: "After a stroke or nerve injury",
      causes: ["Weakness on one side", "Balance and walking difficulties", "Trouble using the hand for daily tasks", "Parkinson&rsquo;s or other neurological conditions"],
      help: "Physiotherapy and occupational therapy in one plan &mdash; walking, balance, arm and hand use, dressing and eating &mdash; with home visits when needed.",
      link: ["/stroke-rehabilitation/", "Stroke rehabilitation"],
      short: "stroke / neuro rehab"
    }
  };

  var WA_ICON = '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 5.3A10.7 10.7 0 0 0 6.8 21.3L5.3 26.7l5.5-1.4A10.7 10.7 0 1 0 16 5.3Zm0 19.2a8.9 8.9 0 0 1-4.5-1.2l-.3-.2-3.3.9.9-3.2-.2-.3A8.9 8.9 0 1 1 16 24.5Zm4.9-6.6c-.3-.2-1.6-.8-1.8-.9-.3-.1-.4-.1-.6.1s-.7.9-.9 1-.3.2-.6.1a7.3 7.3 0 0 1-3.6-3.2c-.3-.5.3-.4.7-1.4.1-.2 0-.3 0-.5s-.6-1.5-.8-2-.4-.5-.6-.5h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 11.9 11.9 0 0 0 4.6 4c2.3 1 2.3.7 2.7.6a2.6 2.6 0 0 0 1.8-1.3 2.2 2.2 0 0 0 .2-1.3c-.1-.1-.3-.2-.6-.3Z"/></svg>';

  function plain(html) { var d = document.createElement("div"); d.innerHTML = html; return d.textContent; }

  function show(key) {
    var a = AREAS[key];
    if (!a) return;
    root.querySelectorAll("[data-area]").forEach(function (b) {
      b.setAttribute("aria-pressed", b.getAttribute("data-area") === key ? "true" : "false");
    });
    var msg = "Hi OT Nest, I'd like to book an assessment for " + plain(a.short) + ".";
    panel.classList.remove("bm-empty");
    panel.innerHTML =
      "<h3>" + a.title + "</h3>" +
      '<p class="bm-k">Often caused by</p>' +
      "<ul>" + a.causes.map(function (c) { return "<li>" + c + "</li>"; }).join("") + "</ul>" +
      '<p class="bm-k">How we help</p>' +
      "<p>" + a.help + "</p>" +
      '<div class="bm-actions">' +
        '<a class="x-btn wa" href="' + WA + encodeURIComponent(msg) + '" target="_blank" rel="noopener">' + WA_ICON + "Ask on WhatsApp</a>" +
        '<a class="x-btn ghost" href="' + a.link[0] + '">' + a.link[1] + " &rarr;</a>" +
      "</div>" +
      '<p class="bm-note">This is a starting point, not a diagnosis &mdash; Dr. Satish will assess you properly at your first visit.</p>';
  }

  root.addEventListener("click", function (e) {
    var b = e.target.closest("[data-area]");
    if (!b) return;
    show(b.getAttribute("data-area"));
    if (b.classList.contains("bm-dot") && window.matchMedia("(max-width: 991px)").matches) {
      panel.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  });

  var chips = Array.prototype.slice.call(root.querySelectorAll(".bm-chip"));
  chips.forEach(function (c, i) {
    c.addEventListener("keydown", function (e) {
      var d = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0;
      if (!d) return;
      e.preventDefault();
      chips[(i + d + chips.length) % chips.length].focus();
    });
  });
})();
