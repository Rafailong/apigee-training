if (context.getVariable('response.status.code') == 404) {
    context.setVariable('response.status.code', 200);
}