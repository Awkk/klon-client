import { Flex, IconButton, Select, useColorModeValue } from "@chakra-ui/react";
import React, { useState } from "react";
import { FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";
import { PostSort, SortOrder } from "../generated/graphql";

interface PostSortWidgetProps {
  setSort: React.Dispatch<React.SetStateAction<PostSort>>;
  setOrder: React.Dispatch<React.SetStateAction<SortOrder>>;
}

export const PostSortWidget: React.FC<PostSortWidgetProps> = ({
  setSort,
  setOrder,
}) => {
  const [toggle, setToggle] = useState<boolean>(false);

  const bgColor = useColorModeValue("gray.50", "gray.800");
  const borderColor = useColorModeValue("gray.300", "gray.600");

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
      <Select
        variant="filled"
        size="sm"
        w="xxs"
        onChange={(e) => {
          setSort(e.target.value as PostSort);
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
          setOrder(toggle ? SortOrder.Desc : SortOrder.Asc);
          setToggle((t) => !t);
        }}
      />
    </Flex>
  );
};
