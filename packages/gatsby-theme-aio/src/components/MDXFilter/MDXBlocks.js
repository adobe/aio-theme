/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import React from 'react';
import globalTheme from '../../theme';

import { Hero } from '../Hero';
import { DiscoverBlock } from '../DiscoverBlock';
import { Resources } from '../Resources';
import { InlineAlert } from '../InlineAlert';
import { InlineNestedAlert } from '../InlineNestedAlert';
import { CodeBlock } from '../CodeBlock';
import { Variant } from '../Variant';
import { TitleBlock } from '../TitleBlock';
import { TextBlock } from '../TextBlock';
import { Divider } from '../Divider';
import { Carousel } from "../Carousel";
import { TabsBlock } from "../Tabs";
import { WrapperComponent } from '../WrapperComponent';
import { FormWrapperComponent } from '../FormWrapperComponent';
import { CustomMenuBlock } from '../CustomMenuBlock';
import { CustomIframeBlock } from '../CustomIframe';
import { CustomCard } from '../CustomCard';
import { MenuWrapperComponent } from '../MenuWrapperComponent';
import { Accordion, AccordionItem } from '../Accordion';
import { AnnouncementBlock } from '../AnnouncementBlock';
import { SummaryBlock } from '../SummaryBlock';
import { ProductCard } from '../ProductCard';
import { ResourceCard } from '../ResourceCard';
import { Media } from '../Media';
import { JsDocParameters } from '../JsDocParameters';
import { ProductCardGrid } from '../ProductCardGrid';
import { OldProductCardGrid } from '../OldProductCardGrid';
import { AnchorButtonGroup } from '../AnchorButtonGroup';
import { DCSummaryBlock } from '../DCSummaryBlock';
import { TeaserBlock } from "../TeaserBlock";
import { VideoCarousel } from '../VideoCarousel';
import { MiniResourceCard } from '../MiniResourceCard';
import { ImageTextBlock } from '../ImageTextBlock';
import { ListBlock } from '../ListBlock';

export const MDXBlocks = {
  Hero,
  DiscoverBlock,
  Resources,
  InlineAlert,
  InlineNestedAlert,
  CodeBlock: ({ theme, ...props }) => <CodeBlock theme={theme ?? globalTheme.code} {...props} />,
  Variant,
  TitleBlock,
  TextBlock,
  Divider,
  AnnouncementBlock,
  SummaryBlock,
  ProductCard,
  ResourceCard,
  Media,
  JsDocParameters,
  ProductCardGrid,
  OldProductCardGrid,
  WrapperComponent,
  FormWrapperComponent,
  MenuWrapperComponent,
  CustomMenuBlock,
  CustomIframeBlock,
  CustomCard,
  TeaserBlock,
  Accordion,
  AccordionItem,
  TabsBlock: ({ theme, ...props }) => (
    <TabsBlock theme={theme ?? globalTheme.code} {...props} />
  ),
  Carousel,
  AnchorButtonGroup,
  DCSummaryBlock,
  VideoCarousel,
  MiniResourceCard,
  ImageTextBlock,
  ListBlock
};
