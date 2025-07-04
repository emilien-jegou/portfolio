type BlogTagsProps = {
  tags: string[];
};

export const BlogTags = ({ tags }: BlogTagsProps) => (
  <div class="flex gap-2 my-6">
    {tags.map((item, idx) => (
      <Tag label={item} key={idx} />
    ))}
  </div>
);

const Tag = ({ label }: { label: string }) => (
  <span class="rounded-onwo-s-md px-3 font-medium text-xs shadow-xs bg-parchment text-lead">
    #{label}
  </span>
);
