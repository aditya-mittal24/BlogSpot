$(".menubutton").click(function () {
  $(".menu").removeClass("left-[-100%]");
  $(".menu").addClass("left-0");
  $(".menubg").removeClass("hidden");
});

$(".close").click(function () {
  $(".menu").removeClass("left-0");
  $(".menu").addClass("left-[-100%]");
  $(".menubg").addClass("hidden");
});

$(".menubg").click(function () {
  $(".menu").removeClass("left-0");
  $(".menu").addClass("left-[-100%]");
  $(".menubg").addClass("hidden");
});

const loadBtn = $(".load-btn");
$(".load-btn").click(function () {
  loadMoreBlogs();
});
const loader = $(".loader");

function loadMoreBlogs() {
  var current_item = $(".card").length;
  const content_container = document.getElementById("content");
  const total = $("#json-total").text();
  $.ajax({
    url: "/load",
    type: "GET",
    data: {
      total_item: current_item,
    },
    beforeSend: function () {
      $(".load-btn").addClass("hidden");
      $(".loader").removeClass("hidden");
    },
    success: function (response) {
      const blogs = response.blogs;
      $(".loader").addClass("hidden");

      blogs.map((blog) => {
        const d = new Date(blog.created_at);
        const date = d.getDate();
        const months = [
          "Jan.",
          "Feb.",
          "March",
          "April",
          "May",
          "June",
          "July",
          "Aug.",
          "Sept.",
          "Oct.",
          "Nov.",
          "Dec.",
        ];
        const month = months[d.getMonth()];
        const year = d.getFullYear();
        content_container.innerHTML += `<a href="blog/${blog.id}">
                                            <div class="card rounded-lg mb-4 overflow-hidden max-w-[360px] cursor-pointer">
                                                <img class="rounded-lg h-[240px] hover:scale-105 object-cover duration-200" src="/media/${blog.image}" alt="">
                                                <h2 class="text-lg my-2 font-medium">${blog.title}</h2>
                                                <h3>${blog.user[0].first_name} ${blog.user[0].last_name} ● ${date} ${month} ${year}</h3>
                                            </div>
                                        </a>`;
      });
      if (current_item + blogs.length != total) {
        $(".load-btn").removeClass("hidden");
      }
    },
    error: function (err) {
      console.log(err);
    },
  });
}
