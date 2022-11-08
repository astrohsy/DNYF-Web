import { api } from "src/boot/axios";

const fetchGroup = () => {
  api
    .get("/groups")
    .then((response) => {
      data.value = response.data;
      console.log(data.value);
    })
    .catch(() => {
      $q.notify({
        color: "negative",
        position: "top",
        message: "Loading failed",
        icon: "report_problem",
      });
    });
};

export { fetchGroup };
