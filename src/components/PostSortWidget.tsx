import { Flex, IconButton, Select, useColorModeValue } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";
import { PostSort, SortOrder, SortPeriod } from "../generated/graphql";

interface PostSortWidgetProps {
  setSort: React.Dispatch<React.SetStateAction<PostSort>>;
  setOrder: React.Dispatch<React.SetStateAction<SortOrder>>;
  setPeriod: React.Dispatch<React.SetStateAction<SortPeriod>>;
}

export const PostSortWidget: React.FC<PostSortWidgetProps> = ({
  setSort,
  setOrder,
  setPeriod,
}) => {
  const [toggle, setToggle] = useState<boolean>(false);
  const router = useRouter();
  const { sort, order, period } = router.query;

  const bgColor = useColorModeValue("gray.50", "gray.800");
  const borderColor = useColorModeValue("gray.300", "gray.600");

  useEffect(() => {
    setSort(
      Object.values(PostSort).includes(sort as PostSort)
        ? (sort as PostSort)
        : PostSort.CreatedDate
    );
  }, [sort, setSort]);

  useEffect(() => {
    setOrder(
      Object.values(SortOrder).includes(order as SortOrder)
        ? (order as SortOrder)
        : SortOrder.Desc
    );
    setToggle(order === SortOrder.Asc);
  }, [order, setOrder]);

  useEffect(() => {
    setPeriod(
      Object.values(SortPeriod).includes(period as SortPeriod)
        ? (period as SortPeriod)
        : SortPeriod.All
    );
  }, [period, setPeriod]);

  return (
    <Flex
      w="100%"
      px="3"
      py="1"
      bgColor={bgColor}
      borderWidth="0.5px"
      borderColor={borderColor}
      borderRadius="md"
      alignItems="center"
      justifyContent="flex-end"
    >
      {" "}
      <Select
        variant="filled"
        size="sm"
        w="xxs"
        value={
          Object.values(SortPeriod).includes(period as SortPeriod)
            ? period
            : SortPeriod.All
        }
        onChange={(e) => {
          setPeriod(e.target.value as SortPeriod);
          router.push({ query: { ...router.query, period: e.target.value } });
        }}
      >
        <option value={SortPeriod.All}>All Time</option>
        <option value={SortPeriod.Day}>Today</option>
        <option value={SortPeriod.Week}>This Week</option>
        <option value={SortPeriod.Month}>This Month</option>
        <option value={SortPeriod.Year}>This Year</option>
      </Select>
      <Select
        variant="filled"
        size="sm"
        ml="2"
        w="xxs"
        value={
          Object.values(PostSort).includes(sort as PostSort)
            ? sort
            : PostSort.CreatedDate
        }
        onChange={(e) => {
          setSort(e.target.value as PostSort);
          router.push({ query: { ...router.query, sort: e.target.value } });
        }}
      >
        <option value={PostSort.CreatedDate}>Created Date</option>
        <option value={PostSort.Score}>Score</option>
        <option value={PostSort.CommentsCount}>Comments</option>
      </Select>
      <IconButton
        variant="ghost"
        icon={toggle ? <FaSortAmountUp /> : <FaSortAmountDown />}
        colorScheme="teal"
        aria-label="sort order"
        onClick={() => {
          const newOrder = toggle ? SortOrder.Desc : SortOrder.Asc;
          setOrder(newOrder);
          setToggle((t) => !t);
          router.push({ query: { ...router.query, order: newOrder } });
        }}
      />
    </Flex>
  );
};
