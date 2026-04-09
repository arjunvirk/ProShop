import { Helmet } from "react-helmet";

const Meta = ({
  title = "Welcome To ProShop",
  description = "We sell the best products for cheap",
  keyword = "electronics, buy electronics, cheap electronics",
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keyword" content={keyword} />
    </Helmet>
  );
};

export default Meta;
