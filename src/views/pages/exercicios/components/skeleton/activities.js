import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

export default function ActivitySkeleton() {
  return (
    <Stack spacing={2}>
      <Skeleton
        sx={{ bgcolor: '#3B489270' }}
        variant="rounded" width={"100%"} height={60} />
      <Skeleton 
       sx={{ bgcolor: '#3B489270' }}
      variant="rounded" width={"100%"} height={45} width={150} />
      <Skeleton
        sx={{ bgcolor: '#3B489270' }}
        variant="rounded" width={"100%"} height={45} />
      <Skeleton
        sx={{ bgcolor: '#3B489270' }}
        variant="rounded" width={"80vw"} height={300} />
      <Skeleton
        sx={{ bgcolor: '#3B489270' }}
        variant="rounded" width={"100%"} height={45} />

    </Stack>
  );
}