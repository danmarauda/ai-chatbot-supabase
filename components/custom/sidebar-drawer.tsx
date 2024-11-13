'use client';

import { Modal, ModalBody, ModalContent } from '@nextui-org/react';
import React from 'react';

import { cn } from '@/lib/utils';

interface SidebarDrawerProps extends React.HTMLAttributes<HTMLDivElement> {
  sidebarWidth?: number;
  sidebarPlacement?: 'left' | 'right';
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  classNames?: {
    wrapper?: string;
    base?: string;
    body?: string;
    closeButton?: string;
  };
}

const SidebarDrawer = React.forwardRef<HTMLDivElement, SidebarDrawerProps>(
  (
    {
      children,
      className,
      onOpenChange,
      isOpen,
      sidebarWidth = 288,
      classNames = {},
      sidebarPlacement = 'left',
      ...props
    },
    ref
  ) => {
    const motionProps = {
      variants: {
        enter: {
          x: 0,
          transition: {
            x: {
              duration: 0.3,
              ease: [0.32, 0.72, 0, 1], // easeOut cubic-bezier
            },
          },
        },
        exit: {
          x: sidebarPlacement === 'left' ? -sidebarWidth : sidebarWidth,
          transition: {
            x: {
              duration: 0.2,
              ease: [0.32, 0.72, 0, 1], // easeOut cubic-bezier
            },
          },
        },
      },
    };

    return (
      <>
        <Modal
          ref={ref}
          {...props}
          classNames={{
            ...classNames,
            wrapper: cn('!w-[var(--sidebar-width)]', classNames?.wrapper, {
              '!items-start !justify-start': sidebarPlacement === 'left',
              '!items-end !justify-end': sidebarPlacement === 'right',
            }),
            base: cn(
              'w-[var(--sidebar-width)] !m-0 p-0 h-full max-h-full',
              classNames?.base,
              className,
              {
                'inset-y-0 left-0 max-h-[none] rounded-l-none !justify-start':
                  sidebarPlacement === 'left',
                'inset-y-0 right-0 max-h-[none] rounded-r-none !justify-end':
                  sidebarPlacement === 'right',
              }
            ),
            body: cn('p-0', classNames?.body),
            closeButton: cn('z-50', classNames?.closeButton),
          }}
          isOpen={isOpen}
          motionProps={motionProps}
          radius="none"
          scrollBehavior="inside"
          style={
            {
              '--sidebar-width': `${sidebarWidth}px`,
            } as React.CSSProperties
          }
          onOpenChange={onOpenChange}
        >
          <ModalContent>
            <ModalBody>{children}</ModalBody>
          </ModalContent>
        </Modal>
        <div
          className={cn(
            'hidden h-full max-w-[var(--sidebar-width)] overflow-x-hidden overflow-y-scroll sm:flex',
            className
          )}
        >
          {children}
        </div>
      </>
    );
  }
);

SidebarDrawer.displayName = 'SidebarDrawer';

export default SidebarDrawer;
