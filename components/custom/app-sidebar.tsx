'use client';

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
  Button,
  Card,
  CardHeader,
  CardBody,
} from '@nextui-org/react';
import {
  ChevronDown,
  BookOpen,
  Mail,
  Globe,
  Gamepad,
  CheckCircle,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

import { AcmeIcon } from '@/components/custom/icons/acme';
import SidebarDrawer from '@/components/custom/sidebar-drawer';
import { SidebarHistory } from '@/components/custom/sidebar-history';
import { SidebarUserNav } from '@/components/custom/sidebar-user-nav';

import type { User } from '@supabase/supabase-js';

const messages = [
  {
    key: 'message1',
    description: 'Study Italian vocabulary',
    icon: <BookOpen className="text-primary-700" size={24} />,
  },
  {
    key: 'message2',
    description: 'Message inviting friend to wedding',
    icon: <Mail className="text-danger-600" size={24} />,
  },
  {
    key: 'message3',
    description: 'Experience Buenos Aires like a local',
    icon: <Globe className="text-warning-600" size={24} />,
  },
  {
    key: 'message4',
    description: 'Design a fun Tetris game',
    icon: <Gamepad className="text-success-600" size={24} />,
  },
];

export function AppSidebar({ user }: { user: User | null }) {
  const router = useRouter();

  return (
    <SidebarDrawer
      sidebarWidth={288}
      sidebarPlacement="left"
      className="group-data-[side=left]:border-r-0"
    >
      <div className="flex h-full flex-col">
        <div className="min-h-[40px] h-[40px] py-[12px] justify-center overflow-hidden">
          <Dropdown className="bg-content1">
            <DropdownTrigger>
              <Button
                disableAnimation
                className="w-full min-w-[120px] items-center text-default-400 data-[hover=true]:bg-[unset]"
                endContent={
                  <ChevronDown className="text-default-400" size={20} />
                }
                variant="light"
              >
                AI Models
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="AI Models"
              className="p-0 pt-2"
              variant="faded"
            >
              <DropdownSection
                classNames={{
                  heading: 'text-tiny px-[10px]',
                }}
                title="Model"
              >
                <DropdownItem
                  key="gpt-4"
                  className="text-default-500 data-[hover=true]:text-default-500"
                  classNames={{
                    description: 'text-default-500 text-tiny',
                  }}
                  description="Most capable GPT-4 model"
                  endContent={
                    <CheckCircle
                      className="text-default-foreground"
                      size={24}
                    />
                  }
                  startContent={
                    <AcmeIcon className="text-default-400" size={24} />
                  }
                >
                  GPT-4
                </DropdownItem>
              </DropdownSection>
            </DropdownMenu>
          </Dropdown>
        </div>

        <div className="flex-1 overflow-auto">
          <SidebarHistory user={user ?? undefined} />
        </div>

        {user && (
          <div className="p-2">
            <SidebarUserNav user={user} />
          </div>
        )}
      </div>
    </SidebarDrawer>
  );
}
