It's just a temporary compatibility fix for React Query v5. We shall remove it after the TS-Rest update.

Here's changes:
- support useSuspenseQuery, and data returned will be body type
```
  const { data } = client.bangumi.get.useSuspenseQuery();
  // data type is Bangmi[], not {status: HTTPCode, body: Bangmi[]}
```