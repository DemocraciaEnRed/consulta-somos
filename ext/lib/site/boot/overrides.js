import 'ext/lib/boot/overrides'

import * as HomeForum from 'lib/site/home-forum/component'
import HomeForumExt from 'ext/lib/site/home-forum/component'

import * as HomeMultiForum from 'lib/site/home-multiforum/component'
import HomeMultiForumExt from 'ext/lib/site/home-multiforum/component'

import * as TopicLayout from 'lib/site/topic-layout/component'
import TopicLayoutExt from 'ext/lib/site/topic-layout/component'

import * as Help from 'lib/site/help/component'
import HelpExt from 'ext/lib/site/help/component'

import * as Comments from 'lib/site/topic-layout/topic-article/comments/component'
import CommentsExt from 'ext/lib/site/topic-layout/topic-article/comments/component'

HomeForum.default = HomeForumExt
HomeMultiForum.default = HomeMultiForumExt
TopicLayout.default = TopicLayoutExt
Help.default = HelpExt
Comments.default = CommentsExt
