/*
 * Copyright 2021 Larder Software Limited
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import React from 'react';

import {
  PullRequestsListView,
  SkeletonPullRequestsListView,
} from '../../PullRequestsListView';
import { useGithubSearchPullRequest } from '../../useGithubSearchPullRequest';
import {
  useGithubLoggedIn,
  GithubNotAuthorized,
} from '../../useGithubLoggedIn';
import Alert from '@material-ui/lab/Alert';

type RequestedReviewsCardProps = {
  query?: string;
};

const defaultReviewsQuery = 'is:open is:pr review-requested:@me archived:false';

const RequestedReviewsContent = (props: RequestedReviewsCardProps) => {
  const { query = defaultReviewsQuery } = props;
  const { loading, error, value } = useGithubSearchPullRequest(query);

  if (loading) return <SkeletonPullRequestsListView />;
  if (error) return <Alert severity="error">{error.message}</Alert>;

  return (
    <PullRequestsListView data={value} emptyStateText="No requested reviews." />
  );
};
export const Content = (props: RequestedReviewsCardProps) => {
  const isLoggedIn = useGithubLoggedIn();

  return isLoggedIn ? (
    <RequestedReviewsContent {...props} />
  ) : (
    <GithubNotAuthorized />
  );
};
