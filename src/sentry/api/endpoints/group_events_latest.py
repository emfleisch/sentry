from django.core.urlresolvers import reverse
from django.http import HttpResponseRedirect

from sentry.api.base import Endpoint
from sentry.models import Group


class GroupEventsLatestEndpoint(Endpoint):
    def get(self, request, group_id):
        group = Group.objects.get(id=group_id)
        event = group.get_latest_event()
        return HttpResponseRedirect(reverse('sentry-api-0-event-details', kwargs={
            'event_id': event.id,
        }))
