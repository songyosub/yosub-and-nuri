import React from 'react';
import Text from '@components/text';
import Image from '@components/image';
import { Flex } from '@components/util/layout/Flex';

const 공유하기_아이콘_크기 = 16;
export function ShareKakao() {
  const openBottomSheet = () => {
    const { Kakao } = window;
    Kakao.Link.sendCustom({
      templateId: 87681,
    });
  };

  return (
    <Flex.Center
      onClick={openBottomSheet}
      css={{
        marginTop: '-2px',
        p: '$6',
        spaceX: '$8',
      }}
    >
      <Text
        color="$blue"
        elementType="button"
        size="lg"
        type="button"
        css={{
          color: '$blue400',
        }}
      >
        다른 사람에게도 알려주기
      </Text>
      <Image.Root>
        <Image width={공유하기_아이콘_크기} height={공유하기_아이콘_크기}>
          <Image.Source src="/assets/icon/export.png" alt="공유하기_아이콘" />
        </Image>
      </Image.Root>
    </Flex.Center>
  );
}
