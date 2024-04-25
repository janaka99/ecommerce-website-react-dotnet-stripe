"use client";
import { PropsWithChildren, ReactNode } from "react";

type StateProps = {
  children: ReactNode;
};

interface Props {
  components: Array<(props: StateProps) => React.JSX.Element>;
  children: ReactNode;
}

export default function Compose(props: Props) {
  const { components = [], children } = props;

  return (
    <>
      {components.reduceRight((acc, Comp) => {
        return <Comp>{acc}</Comp>;
      }, children)}
    </>
  );
}
